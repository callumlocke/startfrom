# startfrom

```
npm install -g startfrom
```

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
