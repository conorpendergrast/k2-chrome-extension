[![Gitter chat](https://badges.gitter.im/codefresh-io/cf-chrome-ext.png)](https://gitter.im/codefresh-io/cf-chrome-ext "Gitter chat")

CodeFresh Chrome Extension
=============

GitHub UI integration for Codefresh platform using chrome extensions.

# Installing this repo
```
git clone git@github.com:codefresh-io/cf-chrome-ext.git
cd cf-chrome-ext
npm install -g gulp bower
npm install
bower install
```

# Installing the Chrome Extension
1. Go to `chrome://extensions`
2. Make sure you have _Developer Mode_ enabled at the top
3. Click _Load Unpacked Extension_
4. Navigate to the `dist` folder and select it

# Gulp Taks
There are three main gulp tasks to use with this project. All files are output to the `dist` folder.

1. `gulp` - Run this when doing development. It will watch files and run all code standardizing tasks whenever the files are saved. It will build all the JS code together in an unminified version for easier debugging.
1. `gulp build` - This will doing the same thing as the normal gulp task except it won't watch files and will exit when finished.
1. `gulp package` - This will output a minified version of the code which can be used to submit to the Chrome Store.

The minified files should not be committed to the repo.

# Code Standards
This repo uses several tools to keep the code standardized.

### [JS Format](https://github.com/jdc0589/JsFormat) - Sublime plugin, use this config for your personal package settings:
```
{
    // jsformat options
    "format_on_save": true,
    "jsbeautifyrc_files": true
}
```

### [Editorconfig](http://editorconfig.org/) - Use a plugin for your editor of choice
There is no configuration required as it should read the `.editorconfig` file in the root of the repo

### [JSCS](https://github.com/jscs-dev/node-jscs)
This is run via a gulp task and no confuragion required. It will use the [AirBnB style guide](https://github.com/airbnb/javascript) by default.

### [JSHint](http://jshint.com/)
This is run via a gulp task

### [CSSLint](https://github.com/CSSLint/csslint)
This is run via a gulp task
