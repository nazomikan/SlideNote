(function (win) {

  function FormManager() {
    this.root = $('#upload');
    this.template = {
      alert: $('#alert-message-template').html()
    }
    this.timer = {
      convert: null
    }
  }

  FormManager.prototype.build = function () {
    this.bindAllListeners();
  };

  FormManager.prototype.bindAllListeners = function () {
    this.root.on('change', '.file-choice-item', $.proxy(this, 'updateFileLabel'));
    this.root.on('submit', $.proxy(this, "onSubmit"));
  };

  FormManager.prototype.updateFileLabel = function (evt) {
    var target = $(evt.currentTarget)
      , label = target.closest('.file').find('span')
      ;

    label.text(target.val());
  };

  FormManager.prototype.onSubmit = function (evt) {
    var fileItem = this.root.find('.file-choice-item')
      , titleItem = this.root.find('#file-name')
      , msgboad = this.root.find('.alert')
      , filename = fileItem.val()
      , title = titleItem.val()
      , msg = []
      , template = this.template.alert
      , snipet
      ;

    msgboad.hide();

    if (!filename) {
      msg.push('ファイルが選択されてません');
    }

    if (!title) {
      msg.push('タイトルは必須項目です');
    }

    if (msg.length) {
      evt.preventDefault();
      snipet = _.template(template, {msgs: msg});
      msgboad.find('.message').empty().html(snipet);
      msgboad.fadeIn();
      return;
    }
    if (win.FormData) {
      evt.preventDefault();
      this.upload(title);
      return;
    }

    return true;
  };

  FormManager.prototype.upload = function (title) {
    var that = this
      , progress = this.root.find('#upload-progress')
      , submitArea = this.root.find('#submit-area')
      , author = this.root.find('#file-author').val()
      , file = this.root.find('.file-choice-item').get(0).files[0]
      , desc = this.root.find('textarea').val()
      , tagText = this.root.find('#file-tags').val()
      , data = new FormData()
      , tags
      ;

    tags = _.chain((tagText || '')
      .split(',')).map(function (v) {
        return v.trim();
      })
      .compact()
      .value()
      .join();

    progress.removeClass('hide');
    submitArea.addClass('hide');
    data.append('pdf', file);
    data.append('title', title);
    data.append('desc', desc);
    data.append('author', author);
    data.append('tag', tags);

    $.ajax({
      url: '/_ajax/uploaded/',
      type: 'post',
      data: data,
      cache: false,
      processData: false,
      contentType: false,
      xhr: function () {
        var xhr = jQuery.ajaxSettings.xhr();
        if (xhr.upload) {
          xhr.upload.addEventListener('progress', $.proxy(that, 'onProgress'), false);
        }
        return xhr;
      }
    }).then(function (data) {
      var barWrapper = that.root.find('#convert-progress')
        , bar = barWrapper.find('.bar')
        ;

      bar.css('width', '100%');
      clearTimeout(that.timer.convert);
      setTimeout(function () {
        location.href = data.link
      }, 600);
    });
  };

  FormManager.prototype.onProgress = function (evt) {
    var that = this
      , percentage
      , bar = this.root.find('#upload-progress .bar')
      ;

    if (!evt.lengthComputable) {
      return;
    }

    percentage = (evt.loaded / evt.total)  * 100;
    bar.css('width', percentage + '%');
    if (percentage === 100) {
      setTimeout(function () {
        that.updateFakeProgress();
      }, 600);
    }
  };

  FormManager.prototype.updateFakeProgress = function () {
    // convertもきちんと変換してると思ったか、馬鹿め。
    var that = this
      , barWrapper = this.root.find('#convert-progress')
      , bar = barWrapper.find('.bar')
      , basePer = 0
      ;

    barWrapper.removeClass('hide');
    function lazyLooper(per) {
      basePer += per = (per / 2);
      bar.css('width', basePer + '%');

      if (basePer > 90) {
        return;
      } else {
        that.timer.convert = setTimeout(function () {
          lazyLooper(per);
        }, randomTimer());
      }
    }

    function randomTimer() {
      var nMax = 2000
        , nMin = 500
        ;

      return Math.floor(Math.random() * (nMax - nMin + 1)) + nMin;
    }

    that.timer.convert = setTimeout(function () {
      lazyLooper(100);
    }, 100);
  };

  Namespace.create('app.upload.widget.FormManager').means(FormManager);
}(window));
