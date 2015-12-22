# startfrom

```
npm install -g startfrom
```

[![NPM version][npm-image]][npm-url] [![Linux Build Status][travis-image]][travis-url] [![Windows Build Status][appveyor-image]][appveyor-url] [![Dependency Status][depstat-image]][depstat-url] [![devDependency Status][devdepstat-image]][devdepstat-url] [![peerDependency Status][peerdepstat-image]][peerdepstat-url]

```
$ startfrom --help

  Use any Github repo as a template for a new project.

    1. Downloads a snapshot of the specified repo into the current working
       directory.
    2. Does git init and git commit.
    3. If there's a package.json, does npm install.

  ____________________________________________________________________________

  Usage
    $ startfrom user/repo[#ref] [subdirectory]

  Examples:
    $ startfrom google/web-starter-kit                user/repo
    $ startfrom google/web-starter-kit#v0.5.4         user/repo#ref
    $ startfrom h5bp/html5-boilerplate#v5.0.0 dist    user/repo#ref subdir
```

<!-- badge URLs -->
[npm-url]: https://npmjs.org/package/startfrom
[npm-image]: https://img.shields.io/npm/v/startfrom.svg?style=flat-square

[travis-url]: https://travis-ci.org/callumlocke/startfrom
[travis-image]: https://img.shields.io/travis/callumlocke/startfrom.svg?style=flat-square&label=Linux

[appveyor-url]: https://ci.appveyor.com/project/callumlocke/startfrom
[appveyor-image]: https://img.shields.io/appveyor/ci/callumlocke/startfrom/master.svg?style=flat-square&label=Windows

[depstat-url]: https://david-dm.org/callumlocke/startfrom
[depstat-image]: https://img.shields.io/david/callumlocke/startfrom.svg?style=flat-square

[devdepstat-url]: https://david-dm.org/callumlocke/startfrom#info=devDependencies
[devdepstat-image]: https://img.shields.io/david/dev/callumlocke/startfrom.svg?style=flat-square&label=devDeps

[peerdepstat-url]: https://david-dm.org/callumlocke/startfrom#info=peerDependencies
[peerdepstat-image]: https://img.shields.io/david/peer/callumlocke/startfrom.svg?style=flat-square&label=peerDeps
