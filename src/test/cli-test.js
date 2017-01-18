/* global describe, before, it */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import del from 'del';
import spawn from 'cross-spawn';
import deepEqual from 'deep-eql';

const cliPath = path.resolve(__dirname, '..', '..', 'cli.js');
const tmpDir = path.resolve(__dirname, '..', '..', 'tmp');

// files from "dist" in https://github.com/h5bp/html5-boilerplate/tree/v5.0.0
const expectedFiles = ['.editorconfig', '.git', '.gitattributes', '.gitignore', '.htaccess', '404.html', 'apple-touch-icon.png', 'browserconfig.xml', 'crossdomain.xml', 'css', 'doc', 'favicon.ico', 'humans.txt', 'img', 'index.html', 'js', 'robots.txt', 'tile-wide.png', 'tile.png'];

describe('startfrom', () => {
  before(() => {
    del.sync(tmpDir);
    fs.mkdirSync(tmpDir);
  });

  it('can download a specific repo/tag/subfolder combination', function (done) {
    this.timeout(20000);

    const cp = spawn(cliPath, ['h5bp/html5-boilerplate#v5.0.0', 'dist', '--confirm'], {
      stdio: 'inherit',
      cwd: tmpDir,
    });

    cp.on('error', done);

    cp.on('close', (code) => {
      assert.strictEqual(code, 0, 'should be code 0');

      assert(deepEqual(fs.readdirSync(tmpDir), expectedFiles), 'files should be as expected');

      done();
    });
  });
});
