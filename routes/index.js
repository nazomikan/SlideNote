var _ = require('underscore')
  , async = require('async')
  , path = require('path')
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
    , title = req.param('title')
    , desc = req.param('desc')
    , author = req.param('author')
    , tag = req.param('tag').split(',')
    , pdf = require('../libraries/pdf')
    , store = require('../libraries/mongo/slide')
    ;

  async.waterfall([
    function (next) {
      pdf.toJpgs(file, function (err, dataset) {
        next(err, dataset);
      });
   },
   function (dataset, next) {
    dataset.link = /slide/ + dataset.id + '/';
    dataset.slides = dataset.slides || [];
    dataset.title = title;
    dataset.desc = desc;
    dataset.author = author;
    dataset.tag = tag || [];

    store.save(dataset, function (err) {
      next(err, dataset);
    });
   }
 ], function (err, dataset) {
   if (err) {
     console.log(err.stack);
     res.json(500);
     return;
   }
   res.json(dataset);
 });
};

exports.search = function (req, res) {
  var store = require('../libraries/mongo/slide')
    , keyword = req.param('keyword') || ''
    ;

  store.find(keyword, function (err, docs) {
    res.render('search/list', {
      title: 'SlideNote',
      docs: docs,
      keyword: keyword
    });
  });
};

exports.slide = function (req, res) {
  var store = require('../libraries/mongo/slide')
    , id = req.param('id')
    ;

  store.findOne(id, function (err, dataset) {
    var row = _.first(dataset);
    row.slides = row.slides.sort(function (a, b) {
      var a_ = +(path.basename(a, '.jpg').replace('slide-', ''))
        , b_ = +(path.basename(b, '.jpg').replace('slide-', ''))
        ;

      if(a_ < b_) return -1;
      if(a_ > b_) return 1;
      return 0;
    });

    row.tag = row.tag.join(', ');
    res.render('slide/slide', {title: 'SlideNote', row: row});
  });
};
