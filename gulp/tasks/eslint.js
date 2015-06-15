'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');

module.exports = function(options) {
  return function() {
    return gulp.src(require('../assets').clientJs)
      .pipe(plumber({
        errorHandler: require('../error.beep')
      }))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
  };
}
