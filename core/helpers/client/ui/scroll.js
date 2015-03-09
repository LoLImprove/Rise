Rise.UI = Rise.UI || {};

Rise.UI.Scroll = {
  to: function(id, opts) {
    var opts = opts || {};
    smoothScroll.animateScroll(null, '#' + id, { speed: opts['speed'] || 500, easing: opts['easing'] || 'easeOutQuart', updateURL: opts['updateURL'] || false, offset: opts['offset'] || 40 });
  }
}
