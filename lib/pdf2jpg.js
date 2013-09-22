var im = require('imagemagick')
  , outputPath = 'public/images/'
;


function convert(file){
    if (file.indexOf('.pdf') === -1) return false;
    var paths = file.split('/')
      , filename = outputPath + paths[paths.length - 1].split('.')[0] + '.jpg'
    ;

    im.convert([file, filename], function(err, stdout){
        if (err) throw err;
        return true;
    });
}

exports.convert = convert;
