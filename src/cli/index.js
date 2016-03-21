import 'babel-polyfill';

import del from 'del';
import ghParse from 'parse-github-url';
import gunzipMaybe from 'gunzip-maybe';
import input from 'input';
import meow from 'meow';
import path from 'path';
import pkg from '../../package.json';
import Promise from 'bluebird';
import request from 'request';
import sander from 'sander';
import shellEscape from 'shell-escape';
import spawn from 'cross-spawn';
import tar from 'tar-fs';
import updateNotifier from 'update-notifier';
import { execSync } from 'child_process';
import { grey, cyan, red, yellow, green, bgWhite } from 'chalk';
import { tick } from 'figures';

const prompt = grey('>');

const help = (`
    🎬  ${cyan('startfrom')}

    1. Downloads a snapshot of the specified repo to your current
       working directory
    2. Does ${cyan('git init')}, ${cyan('git add .')} and ${cyan('git commit')}
    3. If there's a package.json, runs ${cyan('npm install')}

    ${grey('──────────────────────────────────────────────────────────────────────')}

    Usage
      ${prompt} startfrom ${cyan('user')}/${cyan('repo')}${grey('[')}#${cyan('ref')}${grey(']')} ${grey('[')}${cyan('subdirectory')}${grey(']')}

    Examples:
      ${prompt} startfrom google/web-starter-kit
      ${prompt} startfrom google/web-starter-kit#v0.5.4
      ${prompt} startfrom h5bp/html5-boilerplate#v5.0.0 dist
      ${prompt} startfrom https://github.com/mxstbr/react-boilerplate

    Flags:
      --confirm    Automatically confirm the list of files to include
`);

const cli = meow({ help, description: false }, {
  default: {
    confirm: false,
  },
});

// if no CLI args, do the same as `startfrom --help`
if (!cli.input[0]) {
  console.log(help);
  process.exit(0);
}

const dir = process.cwd();
const { owner, name, branch: ref } = ghParse(cli.input[0]);
const subdirectory = cli.input[1] || '.';

// check for updates
const notifier = updateNotifier({ pkg });
notifier.notify();

function run(...args) {
  return new Promise((resolve, reject) => {
    console.log(` ${prompt} ${shellEscape(args)}`);

    const child = spawn(args.shift(), args, {
      stdio: 'inherit',
      cwd: dir,
    });

    child.on('error', reject);

    child.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error('Command failed'));
    });
  });
}

// begin the async sequence
(async () => {
  if (!owner || !name) throw new Error(`Invalid: ${cli.input[0]}`);

  console.log('');

  const files = await sander.readdir(dir);

  // the directory must be empty (except for .git and .DS_Store), otherwise we exit
  if (files.filter(file => file !== '.DS_Store' && file !== '.git').length) {
    console.log(red(`This directory is not empty!`));
    console.log(`\nPlease ${cyan('cd')} into an empty directory and try again.`);
    process.exit(1);
  }

  // if the directory is already git-managed, that is ok providing there are no
  // uncommitted changes (this covers the scenario where user has deleted all
  // existing files from an existing project in order to do a 'fresh start'
  // with the starter kit while retaining history)
  const hasGit = (files.indexOf('.git') > -1);
  if (hasGit) {
    say(`This is alreay a git-managed directory; verifying working directory is clean...`);

    try {
      execSync('git diff --exit-code');
    }
    catch (error) {
      console.log(red(`\nWorking directory is not clean.`));
      console.log('Please commit your changes then try running this script again.');
      process.exit(1);
    }
    doTick();
  }

  // download whole repo tarball into ./__startfrom_tmp
  await new Promise((resolve, reject) => {
    const tarballURL = `https://github.com/${owner}/${name}/archive/${ref}.tar.gz`;
    say(`Downloading and extracting ${tarballURL}`);

    request(tarballURL)
      .pipe(gunzipMaybe())
      .pipe(tar.extract(dir, {
        map(header) {
          header.name = '__startfrom_tmp/' + header.name.substring(
            header.name.indexOf('/') + 1
          );
        },
      }).on('finish', resolve))
      .on('error', reject)
    ;
  });

  // decide which files should be kept
  let keep;
  {
    // make a list of choices (root-level files/folders)
    const tmpDir = path.resolve(dir, '__startfrom_tmp', subdirectory);
    const choices = await Promise.map(
      sander.readdir(tmpDir),
      file => sander.stat(tmpDir, file).then(stat => {
        const choice = { value: file };

        if (stat.isDirectory()) choice.name = cyan(` ${file}/`);
        else choice.name = cyan(` ${file}`);

        switch (file.toLowerCase()) {
          case 'docs':
          case 'doc':
          case 'license':
          case 'license.md':
          case 'licence':
          case 'licence.md':
          case 'readme.md':
          case 'readme':
          case 'changelog.md':
          case 'changelog':
            choice.checked = false;
            break;
          default: choice.checked = true;
        }

        return choice;
      })
    );

    // sort them - unchecked items first, then sort alphabetically
    choices.sort((a, b) => {
      if (a.checked && b.checked) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      }
      if (a.checked) return 1;
      return -1;
    });

    if (cli.flags.confirm) keep = choices.map(choice => choice.value);
    else {
      // let the user select the files to keep
      console.log();
      keep = await input.checkboxes('Which files and folders do you want?', choices);
    }
  }

  // copy over all the contents of the requested subdirectory
  await Promise.each(
    keep,
    file => sander.rename(dir, '__startfrom_tmp', subdirectory, file).to(dir, file)
  );

  // then delete the temp dir
  await del(path.resolve(dir, '__startfrom_tmp'));

  // commit everything...
  say(`Committing initial state...`);
  if (!hasGit) await run('git', 'init');
  await run('git', 'add', '.');
  await run('git', 'commit', '-m', 'startfrom ' + shellEscape(process.argv.slice(2)));
  doTick();

  // run npm install if there's a package.json
  if (await sander.exists(dir, 'package.json')) {
    say(`Running npm install for you (this might take a while)...`);
    await run('npm', 'install');
    doTick();
  }

  console.log(
    '\n' +
    '\n  ' + bgWhite('                         ') +
    '\n  ' + bgWhite.black(`  🎬  startfrom complete  `) +
    '\n  ' + bgWhite('                         ') + '\n'
  );
})();

function say(message) {
  console.log(yellow(`\n\n${message}`));
}

function doTick() {
  console.log(green(tick));
}
