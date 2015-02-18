Rise.UI = Rise.UI || {}

Rise.UI.doesElementExists = (function(el) {
  if (_.isString(el)) {
    return $(el).length > 0;
  } else {
    return el.length > 0;
  }
});
