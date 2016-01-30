# 🎬 startfrom

[![NPM version][npm-image]][npm-url] [![Linux Build Status][travis-image]][travis-url] [![Windows Build Status][appveyor-image]][appveyor-url] [![Dependency Status][depstat-image]][depstat-url] [![devDependency Status][devdepstat-image]][devdepstat-url] [![peerDependency Status][peerdepstat-image]][peerdepstat-url]

A little tool to download a snapshot of a Github repo and use it as a starting point for a new project. (Handy if you use a lot of [boilerplates and starter kits].)

![screenshot]

## Install

```sh
> npm install -g startfrom
```

(Requires Node 4 or higher.)

## How to use

Go into an empty directory, then run startfrom with a GitHub repo identifier.  For example:

```sh
> startfrom google/web-starter-kit

# ...or just paste the whole GitHub URL, if it's easier:
> startfrom https://github.com/google/web-starter-kit
```

What it does:

1. Downloads a **snapshot** of the specified repo (not including the git history) and extracts it into your current working directory.
2. Initialises your directory as a new git repo and commits the initial files.
3. Runs `npm install` for you (if there's a package.json present).

## More options

#### Start from a specific branch/tag/commit

```sh
> startfrom mxstbr/react-boilerplate#v2.5.0
```

#### Start from a subdirectory of the repo

For example, with [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate) you probably don't want the whole repo, you just want its `dist` folder. Give the required folder name as a second argument:

```sh
> startfrom h5bp/html5-boilerplate dist
```

## TODO

- Add a way to remove unneeded stuff (e.g. `./docs`) before the initial commit
- Add the git hash (of the commit from the source repo that was started from) to the initial commit message

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
