var path = require('path')
  ;

/*
 * GET home page.
 */
exports.index = function (req, res) {
  res.render('index/index', {title: 'SlideNote'});
};

exports.upload = function (req, res) {
  res.render('upload/upload', {title: 'SlideNote'});
};

exports.uploaded = function (req, res) {
  var file = req.files.pdf.path
    , pdf = require('../libraries/pdf')
    ;

  pdf.toJpgs(file, function (err, dataset) {
    dataset.link = /slide/ + dataset.id + '/';
    res.json(dataset);
  });
};

exports.search = function (req, res) {
  var slideFinder = require('../libraries/mongo/slide')
    , Model = slideFinder.Model
    , keyword = req.param('keyword') || ''
    ;

  slideFinder.find(keyword, function (err, docs) {
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
