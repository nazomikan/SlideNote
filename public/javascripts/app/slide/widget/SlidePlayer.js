(function () {

  function SlidePlayer() {
    this.root = $('#slide-player');
  }

  SlidePlayer.prototype.build = function () {
    this.bindAllListeners();
  };

  SlidePlayer.prototype.bindAllListeners = function () {
    this.root.on('click', '#prev', $.proxy(this, 'onPrev'));
    this.root.on('click', '#next', $.proxy(this, 'onNext'));
    this.root.on('click', '#first', $.proxy(this, 'onFirst'));
    this.root.on('click', '#last', $.proxy(this, 'onLast'));
    this.root.on('click', '#zoom', $.proxy(this, 'zoom'));
    $(window).on('keydown', $.proxy(this, 'operateSlide'));
  };

  SlidePlayer.prototype.onPrev = function (evt) {
    evt.preventDefault();
    var current = this.root.find('.slide:visible')
      , currentNum = current.data('page')
      , prevSelector = '.slide-' + (currentNum - 1)
      , prev = this.root.find(prevSelector).show();
      ;

    if (prev.length) {
      current.hide();
      prev.show();
    }
  };

  SlidePlayer.prototype.onNext = function (evt) {
    evt.preventDefault();
    var current = this.root.find('.slide:visible')
      , currentNum = current.data('page')
      , nextSelector = '.slide-' + (currentNum + 1)
      , next = this.root.find(nextSelector).show();
      ;

    if (next.length) {
      current.hide();
      next.show();
    }
  };

  SlidePlayer.prototype.onFirst = function (evt) {
    evt.preventDefault();
    var current = this.root.find('.slide:visible')
      , top = this.root.find('.slide-0').show();
      ;

    if (top.length) {
      current.hide();
      top.show();
    }
  };

  SlidePlayer.prototype.onLast = function (evt) {
    evt.preventDefault();
    var current = this.root.find('.slide:visible')
      , len = this.root.find('.slide').length
      , last = this.root.find('.slide-' + (len - 1)).show();
      ;

    if (last.length) {
      current.hide();
      last.show();
    }
  };

  SlidePlayer.prototype.zoom = function(evt) {
    var view = $('#thumbnail')[0]
    ;
    if (view.requestFullScreen) {
      view.requestFullScreen();
    } else if (view.mozRequestFullScreen) {
      view.mozRequestFullScreen();
    } else if (view.webkitRequestFullScreen) {
      view.webkitRequestFullScreen();
    }
  };

  SlidePlayer.prototype.operateSlide = function(evt) {
    var code = evt.keyCode
      , isFullScreen = document.mozFullScreen || document.webkitIsFullScreen
      ;

    if(isFullScreen){
      if (code === 37 || code === 38) {
        this.root.find('#prev').trigger('click');
      }
      if (code === 39 || code === 40) {
        this.root.find('#next').trigger('click');
      }
    }
  };

  Namespace.create('app.slide.widget.SlidePlayer').means(SlidePlayer);
}());
