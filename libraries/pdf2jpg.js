var path = require('path')
  , im = require('imagemagick')
  , outputPath = path.resolve(__dirname, '../public/images')
  ;

exports.convert = function (filePath, next) {
  var imagePath
    , fileName
    ;

  if (path.extname(filePath) !== '.pdf') {
    return next(new TypeError(filePath + ' must be pdf.'));
  }

  fileName = path.basename(filePath, '.pdf');
  imagePath = path.join(outputPath, fileName) + '.jpg';

  im.convert([filePath, imagePath], function (err, stdout) {
    return next(err, imagePath);
  });
};
