$(function () {
  app.dispatch({
    _pattern: {
      '_default': 'base',
      '^/$': 'index',
      '^/upload/$': 'upload',
      '^/slide/[0-9]+/$': 'slide'
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
    },
    slide: {
      core: [],
      widget: [
        'app.slide.widget.SlidePlayer'
      ]
    }
  });
});
