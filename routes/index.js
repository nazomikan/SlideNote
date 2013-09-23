var path = require('path')
  ;

/*
 * GET home page.
 */
exports.index = function (req, res) {
  res.render('index/index', {title: 'SlideNote'});
};

exports.upload = function (req, res) {
  //var pdf = require('../libraries/pdf')
  //  ;
  //var file = path.resolve('resources/pdf/cuckoo.pdf');
  //pdf.toJpgs(file, function (err, data) {
  //  console.log(err);
  //});
  res.render('upload/upload', {title: 'SlideNote'});
};

exports.search = function (req, res) {
  var slideFinder = require('../libraries/mongo/slide')
    , Model = slideFinder.Model
    , keyword = req.param('keyword') || ''
    ;

  slideFinder.findByBroadMatch(keyword, function (err, docs) {
    res.render('search/list', {
      title: 'SlideNote',
      docs: docs,
      keyword: keyword
    });
  });
};

exports.slide = function (req, res) {
  res.render('slide/slide', {title: 'SlideNote'});
};
