(function (global) {
  function parseObjectChain(str, target) {
    var chain = str.split('.')
      , objectChain
      , object
      ;

    try {
      object = (function parse(index, parent) {
        var current = parent[chain[index]];

        if (chain.length === index + 1) {
          return current;
        }
        return parse(index + 1, current);
      }(0, target));
    } catch(err) {
      throw new Error('"' + str + '" can not parse (undefined?)');
    }

    return object;
  }

  function getObjectChain(rule) {
    var path = location.pathname
      , pattern
      , patternKey
      , key
      ;

    for(key in rule._pattern) {
      if (key === '_default') {
        continue;
      }

      if ((new RegExp(key)).test(path)) {
        patternKey = key;
        break;
      }
    }

    return parseObjectChain(
      (rule._pattern[patternKey] || 'base'),
      rule
    );
  }

  /**
   * urlに合わせて設定ファイルからwidget/coreをbuildする
   *
   * @param {Object} rule
   *
   * [sample rule format]
   * rule = {
   *    _pattern: {
   *        '_default': 'base',
   *        '/xxx/yyy/': 'a.b'
   *    },
   *    base: {
   *       core: [
   *            'app.xxx.core.Class',
   *            'app.xxx.core.Class'
   *       ],
   *       widget: [
   *            'app.xxx.widget.Class',
   *            'app.xxx.widget.Class'
   *       ]
   *    },
   *    a: {
   *        b: {
   *            core: [...],
   *            widget: [...]
   *        },...
   *    }
   * }
   */
  function dispatch(rule) {
    var modules = getObjectChain(rule)
      ;

    $.each(modules.core || [], function (index, cores) {
      var Core = parseObjectChain(cores, global)
        , core = new Core()
        ;

      core.build();
    });

    $.each(modules.widget || [], function (index, widgets) {
      var Widget = parseObjectChain(widgets, global)
        , widget = new Widget()
        ;

      widget.build();
    });
  }

  Namespace.create('app.dispatch').means(dispatch);
}(window));
