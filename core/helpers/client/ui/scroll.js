Rise.UI = Rise.UI || {};

Rise.UI.Scroll = {
  to: function(selector, opts) {
    var opts = opts || {};

    if (_.str.startsWith(selector, '#')) {
      var id = selector;
    } else {
      var id   = '#' + $(selector).first().attr('id');
    }

    smoothScroll.animateScroll(null, id, { speed: opts['speed'] || 500, easing: opts['easing'] || 'easeOutQuart', updateURL: opts['updateURL'] || false, offset: opts['offset'] || 40 });
  }
}
