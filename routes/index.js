
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index/index', { title: 'SlideNote' });
};

exports.upload = function(req, res){
  res.render('upload/upload', { title: 'SlideNote' });
};

exports.search = function(req, res){
  res.render('search/list', { title: 'SlideNote' });
};

exports.slide = function(req, res){
  res.render('slide/slide', { title: 'SlideNote' });
};
