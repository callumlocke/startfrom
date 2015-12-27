# 🎬 startfrom

[![NPM version][npm-image]][npm-url] [![Linux Build Status][travis-image]][travis-url] [![Windows Build Status][appveyor-image]][appveyor-url] [![Dependency Status][depstat-image]][depstat-url] [![devDependency Status][devdepstat-image]][devdepstat-url] [![peerDependency Status][peerdepstat-image]][peerdepstat-url]

A little tool to download a snapshot of a Github repo and use it as a starting point for a new project. Useful if you consume a lot of [boilerplates and starter kits].

```sh
$ npm install -g startfrom
```

![screenshot]

## Usage

Enter an empty directory then run something like this:

```sh
$ startfrom https://github.com/google/web-starter-kit
```

What that does:

1. downloads a snapshot of the specified repo (Google's [Web Starter Kit] in this case)
2. initialises your directory as a git repo and commits the initial files
3. runs `npm install` for you (only if there's a package.json present)

#### More options

You can use Github's user/repo shorthand:

```sh
$ startfrom google/web-starter-kit
```

You can also use a `#` to specify a branch/commit/tag other than 'master':

```sh
$ startfrom mxstbr/react-boilerplate#v2.5.0
```

Some boilerplate repos expect you to use their build artifacts as your starting point, rather than the root of their repository. [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate) is a good example – you're supposed to use its `dist` subdirectory as your starting point. You can do this by passing a second argument:

```sh
$ startfrom h5bp/html5-boilerplate dist
```

[boilerplates and starter kits]: https://github.com/melvin0008/awesome-projects-boilerplates
[screenshot]: screenshot.png
[HTML5 Boilerplate]: https://github.com/h5bp/html5-boilerplate
[Web Starter Kit]: https://github.com/google/web-starter-kit

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
