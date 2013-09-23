var im = require('imagemagick')
  , path = require('path')
  , outputPath = path.resolve('..', 'public/images')
;

function convert(filePath, next){
    if (path.extname(filePath) !== '.pdf'){
        return next(new Error(filePath + ' is not pdf.'), null);
    }
    var imagePath = path.join(outputPath, path.basename(filePath, '.pdf')) + '.jpg'
    ;

    im.convert([filePath, imagePath], function(err, stdout){
        if (err){
            return next(err, null);
        }
        return next(null, imagePath);
    });
}

exports.convert = convert;
