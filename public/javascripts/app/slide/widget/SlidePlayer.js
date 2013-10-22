(function (win, doc) {

  function SlidePlayer() {
    this.root = $('#slide-player');
  }

  SlidePlayer.prototype.build = function () {
    this.initView();
    this.bindAllListeners();
  };

  SlidePlayer.prototype.initView = function () {
    var view = this.root.find('#thumbnail').get(0)
      , zoom = this.root.find('#zoom').get(0)
      ;

    if (view.requestFullScreen && view.mozRequestFullScreen && view.webkitRequestFullScreen) {
      $(zoom).addClass('lock');
    }
  };

  SlidePlayer.prototype.bindAllListeners = function () {
    this.root.on('click', '#prev', $.proxy(this, 'onPrev'));
    this.root.on('click', '#next', $.proxy(this, 'onNext'));
    this.root.on('click', '#first', $.proxy(this, 'onFirst'));
    this.root.on('click', '#last', $.proxy(this, 'onLast'));
    this.root.on('click', '#zoom', $.proxy(this, 'zoom'));
    $(win).on('keydown', $.proxy(this, 'operateSlide'));
  };

  SlidePlayer.prototype.onPrev = function (evt) {
    evt.preventDefault();
    var current = this.root.find('.slide:visible')
      , currentNum = current.data('page')
      , prevSelector = '.slide-' + (currentNum - 1)
      , prev = this.root.find(prevSelector).show()
      , counter = this.root.find('#count')
      ;

    if (prev.length) {
      current.hide();
      prev.show();
      counter.text(+prev.data('page') + 1);
    }
  };

  SlidePlayer.prototype.onNext = function (evt) {
    evt.preventDefault();
    var current = this.root.find('.slide:visible')
      , currentNum = current.data('page')
      , nextSelector = '.slide-' + (currentNum + 1)
      , next = this.root.find(nextSelector).show()
      , counter = this.root.find('#count')
      ;

    if (next.length) {
      current.hide();
      next.show();
      counter.text(+next.data('page') + 1);
    }
  };

  SlidePlayer.prototype.onFirst = function (evt) {
    evt.preventDefault();
    var current = this.root.find('.slide:visible')
      , top = this.root.find('.slide-0').show()
      , counter = this.root.find('#count')
      ;

    if (top.length) {
      current.hide();
      top.show();
      counter.text(+top.data('page') + 1);
    }
  };

  SlidePlayer.prototype.onLast = function (evt) {
    evt.preventDefault();
    var current = this.root.find('.slide:visible')
      , len = this.root.find('.slide').length
      , last = this.root.find('.slide-' + (len - 1)).show()
      , counter = this.root.find('#count')
      ;

    if (last.length) {
      current.hide();
      last.show();
      counter.text(+last.data('page') + 1);
    }
  };

  SlidePlayer.prototype.zoom = function (evt) {
    var thumb = this.root.find('#thumbnail')
      , view = thumb.get(0)
      , fullScreen
      ;

    evt.preventDefault();
    evt.stopPropagation();

    fullScreen = view.requestFullScreen || view.mozRequestFullScreen || view.webkitRequestFullScreen;
    if (fullScreen) {
      fullScreen.call(view);
    }
  };

  SlidePlayer.prototype.operateSlide = function (evt) {
    var code = evt.keyCode
      , isFullScreen = doc.mozFullScreen || doc.webkitIsFullScreen
      ;

    if (isFullScreen) {
      if (code === 37 || code === 38) {
        this.root.find('#prev').trigger('click');
      }
      if (code === 39 || code === 40) {
        this.root.find('#next').trigger('click');
      }
    }
    return true;
  };

  Namespace.create('app.slide.widget.SlidePlayer').means(SlidePlayer);
}(window, document));
