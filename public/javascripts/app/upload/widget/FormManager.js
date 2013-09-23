(function () {

  function FormManager() {
    this.root = $('#upload');
    this.template = {
      alert: $('#alert-message-template').html()
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
      evt.stopPropagation();
      snipet = _.template(template, {msgs: msg});
      msgboad.find('.message').empty().html(snipet);
      msgboad.fadeIn();
    }
  };

  Namespace.create('app.upload.widget.FormManager').means(FormManager);
}());
