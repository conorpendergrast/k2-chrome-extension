'use strict';

var gulp = require('gulp');

module.exports = function(options) {
  return function() {
    var clientWatcher = gulp.watch(require('../assets').clientJs, ['eslint']);
    var clientWatcherJsx = gulp.watch(require('../assets').clientJsx, ['react']);
    var clientWatcherSass = gulp.watch(require('../assets').clientSass, ['sass']);
    var clientWatcherHtml = gulp.watch(require('../assets').clientHtml, ['htmlcopy']);
  };
};
