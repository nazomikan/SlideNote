var path = require('path')
  , fs = require('fs')
  , async = require('async')
  , im = require('imagemagick')
  , sanitize = require("sanitize-filename")
  , srcPath = '/images/slides/'
  , outputBasePath = path.resolve(__dirname, '../public' + srcPath)
  ;

exports.convert = function (filePath, callback) {
  var imagePath
    , outputPath
    , dirname = Date.now().toString()
    ;

  if (path.extname(filePath) !== '.pdf') {
    return callback(new TypeError(filePath + ' must be pdf.'));
  }

  outputPath = path.join(outputBasePath, dirname);
  imagePath = path.join(outputPath, 'slide') + '.jpg';

  async.waterfall([
    function (next) {
      fs.mkdir(outputPath, function (err, data) {
        next(err, data);
      });
    },
    function (data, next) {
      im.convert([filePath, imagePath], function (err, stdout) {
        next(err, stdout);
      });
    },
    function (stdout, next) {
      //fs.unlink(filePath);
      var src = path.join(srcPath, dirname);
      fs.readdir(outputPath, function (err, files) {
        files = (files || []).map(function (v) {
          return path.resolve(src, v);
        });

        next(err, imagePath);
      });
    }
  ], function (err, res) {
    return callback(err, imagePath);
  });
};
