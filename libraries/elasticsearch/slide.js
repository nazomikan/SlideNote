var elasticsearch = require('elasticsearch')
  , config = {
      _index: 'slidesidx',
      _type: 'slide'
    }
  , es = elasticsearch(config)
  ;

exports.findOne = function (id, callback) {
  // for  time lag of reflecting mongodb to elasticsearch
  setTimeout(function () {
    es.search({
      query: {
        field: {id: id}
      }
    }, function (err, data) {
      var datasets = data.hits.hits
        ;
      if (datasets[0].length === 0) {
        exports.findOneWait(id, callback);
      } else {
        callback(err, datasets);
      }
    });
  }, 10);
}

exports.find = function (keyword, callback) {
  keyword = '*' + keyword + '*';
  es.search({
    query: {
      query_string : { query : keyword }
    }
  }, function (err, data) {
    callback(err, data.hits.hits);
  });
};
