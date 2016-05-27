# 🎬 startfrom

[![NPM version][npm-image]][npm-url] [![Linux Build Status][travis-image]][travis-url] [![Windows Build Status][appveyor-image]][appveyor-url] [![Dependency Status][depstat-image]][depstat-url] [![devDependency Status][devdepstat-image]][devdepstat-url] [![peerDependency Status][peerdepstat-image]][peerdepstat-url]

A little tool to download a snapshot of a Github repo and use it as a starting point for a new project.

Intended for people who use a lot of [boilerplates and starter kits].

![screenshot]

## Install

```sh
> npm install -g startfrom
```

## How to use

Go into an empty directory, then run `startfrom` with a GitHub repo identifier.  For example:

```sh
> startfrom google/web-starter-kit

# ...or just paste the whole GitHub URL, if it's easier:
> startfrom https://github.com/google/web-starter-kit
```

## What it does

1. Downloads a snapshot of the specified repo to your current working directory. (Just a snapshot – no git history.)
2. Does `git init`, `git add .` and `git commit`. (Your original startfrom command is used as the commit message.)
3. If there's a package.json, runs `npm install`.

It will also ask for confirmation of which files you want to include. By default, things like `README.md`, `CHANGELOG` and `docs` are deselected, but you can change the selection if you want.

## More options

#### Start from a specific branch/tag/commit reference

Use a `#` symbol, for example:

```sh
> startfrom mxstbr/react-boilerplate#v2.5.0
```

#### Start from a subdirectory of a repo

Sometimes you just want a subdirectory. For example, with [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate) you probably just want its `dist` folder.

Specify your desired subdirectory as a second argument:

```sh
> startfrom h5bp/html5-boilerplate dist
```

#### Skipping the interactive prompt

If you don't want startfrom to prompt you to confirm which files you want, use the `--confirm` flag to auto-confirm it. Might be useful in some CI situations.

## Licence

MIT © [Callum Locke](http://callumlocke.com/)

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
