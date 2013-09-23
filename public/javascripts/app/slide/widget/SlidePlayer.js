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

  Namespace.create('app.slide.widget.SlidePlayer').means(SlidePlayer);
}());
