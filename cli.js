#!/usr/bin/env node
/* eslint-disable */

const majorVersion = Number(process.version.substring(1).split('.')[0]);

if (majorVersion < 4) {
  console.error('Requires Node 4 or higher. Current Node version: ' + process.version);
  process.exit(1);
}

require('./dist/cli');
