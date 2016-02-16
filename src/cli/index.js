import _rimraf from 'rimraf';
import ghParse from 'parse-github-url';
import gunzipMaybe from 'gunzip-maybe';
import meow from 'meow';
import path from 'path';
import pkg from '../../package.json';
import Promise, {coroutine, promisify} from 'bluebird';
import request from 'request';
import sander from 'sander';
import shellEscape from 'shell-escape';
import spawn from 'cross-spawn';
import {tick} from 'figures';
import tar from 'tar-fs';
import updateNotifier from 'update-notifier';
import {execSync} from 'child_process';
import {grey, cyan, red, yellow, green, bgGreen} from 'chalk';

const rimraf = promisify(_rimraf);

const prompt = grey('>');

const helpText = (`
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
`);

const cli = meow(helpText);

// if no CLI args, do the same as `startfrom --help`
if (!cli.input[0]) {
  console.log(helpText);
  process.exit(0);
}

const dir = process.cwd();
const {owner, name, branch: ref} = ghParse(cli.input[0]);
const subdirectory = cli.input[1] || '.';

// check for updates
const notifier = updateNotifier({pkg});
notifier.notify();

function run(...args) {
  return new Promise((resolve, reject) => {
    console.log(grey(' > ') + shellEscape(args));

    const child = spawn(args.shift(), args, {
      stdio: 'inherit',
      cwd: dir,
    });

    child.on('error', reject);

    child.on('close', code => {
      if (code !== 0) reject(new Error('Command failed'));
      else resolve();
    });
  });
}

// begin the async sequence
coroutine(function *() {
  if (!owner || !name) throw new Error(`Invalid: ${cli.input[0]}`);

  console.log('');

  const files = yield sander.readdir(dir);

  // the directory must be empty (except for .git and .DS_Store), otherwise we exit
  if (files.filter(file => file !== '.DS_Store' && file !== '.git').length) {
    console.log(red('This directory is not empty!'));
    console.log('\nPlease ' + cyan('cd') + ' into an empty directory and try again.');
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
  yield new Promise((resolve, reject) => {
    const tarballURL = `https://github.com/${owner}/${name}/archive/${ref}.tar.gz`;
    say('Downloading and extracting ' + tarballURL);

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

  // copy over all the contents of the requested subdirectory
  yield Promise.map(
    sander.readdir(dir, '__startfrom_tmp', subdirectory),
    file => sander.rename(dir, '__startfrom_tmp', subdirectory, file).to(dir, file)
  );

  // then rimraf the temp dir
  yield rimraf(path.resolve(dir, '__startfrom_tmp'));

  // commit everything...
  say(`Committing initial state...`);
  if (!hasGit) yield run('git', 'init');
  yield run('git', 'add', '.');
  yield run('git', 'commit', '-m', 'startfrom ' + shellEscape(process.argv.slice(2)));
  doTick();

  // run npm install if there's a package.json
  if (yield sander.exists(dir, 'package.json')) {
    say(`Running npm install for you (this might take a while)...`);
    yield run('npm', 'install');
    doTick();
  }

  console.log('\n\n' + bgGreen.black(` ${tick} ALL DONE! `));
})();

function say(message) {
  console.log(yellow(`\n\n${message}`));
}

function doTick() {
  console.log(green(tick));
}
