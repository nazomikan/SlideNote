$(function () {
  app.dispatch({
    _pattern: {
      '_default': 'base',
      '^/$': 'index',
      '^/upload/$': 'upload'
    },
    base: {},
    index: {
      core: [],
      widget: []
    },
    upload: {
      core: [],
      widget: [
        'app.upload.widget.FormManager'
      ]
    }
  });
});
