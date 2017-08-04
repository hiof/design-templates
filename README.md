# design-templates plugin

## About

A plugin with the contents for [http://design.hiof.no/dokumentmaler](http://design.hiof.no/dokumentmaler).

## Required knowledge

This package require knowledge of the following technologies, technics and modules:

- [Markdown](https://daringfireball.net/projects/markdown/syntax)
- [Node.js](https://nodejs.org)
    - [NPM](https://www.npmjs.com)
- [Grunt](http://gruntjs.com) and Grunt tasks (see `Gruntfile.js` for details)
- [Bower](http://bower.io)
- [SSH](https://en.wikipedia.org/wiki/Secure_Shell)
- [Git](https://git-scm.com)
    - [Github](https://github.com)
- [Semantic versioning](http://semver.org)

## Copyright

This project is distributed under a GNU General Public License v3 - Take a look at the COPYING file for details.

## Install

Install [Git](http://git-scm.com) if it's not already installed on your computer. Then run (this will download this project to the folder the shell has open):

```
$ git clone https://github.com/hiof/design-templates.git
```

Install [Node.js](http://nodejs.org)) if it's not already installed on your computer. Then run (this will install the project dependencies):

```
$ sudo npm install -g grunt-cli
$ npm install
$ bower install
```

## Edit the content

You edit the file description, illustrations and references to the downloadable files in the `./content/` folder of this project.

The downloadable assets are available in the `./assets/` folder. Publicly available files are available in the public subfolder. Edit and add files/folders according to the established naming convention in the folder.

The logo assets are generated from a single file so you don't have to create all the files manually(as of this writing, 180 different files). The documentation for this is available here: `./assets/source-files/logo/readme.md`.

## Build

`$ grunt build`: Compiles and builds the design-templates plugin

## Deploy

1. Rename secret-template.json to secret.json and add your credentials.
2. Deploy and test your code on the staging server `$ grunt deploy-stage`
3. Deploy to production `$ grunt deploy-prod`

## Releases

[Github releases](https://github.com/hiof/design-templates/releases)


### Roadmap
