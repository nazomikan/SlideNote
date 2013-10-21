var elasticsearch = require('elasticsearch')
  , config = {
      _index: 'slidesidx',
      _type: 'slide'
    }
  , es = elasticsearch(config)
  ;

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
