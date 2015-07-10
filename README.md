K2 Chrome Extension
=============

GitHub UI integration for K2 - Kernel Scheduling Method

# Installing this repo
```
git clone git@github.com:tgolen/k2-chrome-extension.git
cd k2-chrome-extension
npm install -g gulp
npm install
```

# Installing the Chrome Extension
## Easy (auto-updating)
1. Download the extension from [here](https://github.com/tgolen/k2-chrome-extension/blob/master/build/k2.crx)
2. Go to `chrome://extensions`
3. Drop the extension onto this window and let it install

## From the Source Code (for development)
1. Go to `chrome://extensions`
2. Make sure you have _Developer Mode_ enabled at the top
3. Click _Load Unpacked Extension_
4. Navigate to the `dist` folder and select it

## NOTE: It Requests Your GitHub Password
Your github password is stored locally and securely. It is used to make basic auth calls to the GitHub API. This is so that we don't have to implement OAuth or a separate API and we can get around a lot of the rate limiting issues.

# Gulp Taks
There are three main gulp tasks to use with this project. All files are output to the `dist` folder.

1. `gulp` - Run this when doing development. It will watch files and run all code standardizing tasks whenever the files are saved. It will build all the JS code together in an unminified version for easier debugging.
1. `gulp build` - This will doing the same thing as the normal gulp task except it won't watch files and will exit when finished.
1. `gulp package` - This will output a minified version of the code which can be used to submit to the Chrome Store.

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
