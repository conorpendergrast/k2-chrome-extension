'use strict';

var fs              = require('fs');
var gulp            = require('gulp');
var gutil           = require('gulp-util');
var join            = require('path').join;
var through         = require('through2');
var ChromeExtension = require('crx');

function make(options) {
  function onError(err) {
    gutil.log( gutil.colors.red(err) );
  }

  function transform(file, encoding, done) {
    var that = this;
    var crx = new ChromeExtension({
      privateKey: fs.readFileSync(options.key, 'utf8')
    });

    crx
      .load( options.source )
      .then(function() {
        return crx
                 .pack()
                 .then(function(crxBuffer) {
                   that.push(
                     new gutil.File({
                       path: 'k2.crx',
                       contents: crxBuffer
                     })
                   );
                   done();
                 })
                .catch(onError);
      })
      .catch(onError);
  }

  return through.obj(transform);
}

module.exports = function() {
  var source = join(__dirname, '/../../dist');
  var key = join(__dirname, '/../../dist.pem');
  var destination = join(__dirname, '/../../build');

  return function() {
    gulp.src( source )
      .pipe( make({ source: source, key: key }) )
      .pipe( gulp.dest( destination ) );
  };
};
