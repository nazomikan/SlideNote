var mongoose = require('mongoose')
  , Schema
  , Model
  , Keyword
  , db
  ;

db = mongoose.connect('mongodb://localhost/slide_note')

Schema = new mongoose.Schema({
  id:          {type: Number, required: true},
  length:      {type: Number, required: true},
  title:       {type: String, required:true, trim: true},
  author:      {type: String, required:true, trim: true},
  description: {type: String, required: true, trim: true},
  keyword:     [{type: String}],
  slides:      [{type: String}],
  updated:     {type: Date, required:true, default: Date.now}
});

Model = db.model('slide', Schema);

exports.Model = Model;

exports.find = function (keyword, callback) {
  var exp1 = new RegExp(keyword, 'i')
    , exp2 = new RegExp('^' + keyword + '$', 'i')
    ;

  Model.find({
    $or: [
      {title: exp1},
      {description: exp1},
      {keyword: exp2}
    ]
  }, function (err, docs) {
    callback(err, docs);
  });
};
