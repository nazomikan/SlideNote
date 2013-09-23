var mongoose = require('mongoose')
  , Schema
  , Model
  , db
  ;

db = mongoose.connect('mongodb://localhost/slide_note')

Schema = new mongoose.Schema({
  id: Number,
  length: Number,
  title: String,
  description: String,
  keyword: Array,
  updated: {type: Date, default: Date.now}
});

Model = db.model('slide', Schema);

exports.Model = Model;

exports.findByBroadMatch = function (keyword, callback) {
  var exp = new RegExp('^' + keyword + '$', 'i')
    ;

  Model.find({
    $or: [
      {title: exp},
      {description: exp}
    ]
  }, function (err, docs) {
    callback(err, docs);
  });
};
