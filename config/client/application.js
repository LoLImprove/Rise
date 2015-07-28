/* Subscribe to server console logs */
ConsoleMe.subscribe(); // TODO: Only dev

SimpleSchema.debug = true;

/* Flash messages config */
FlashMessages.configure({
  autoHide: true,
  hideDelay: 4000,
  autoScroll: false
});

var andClear = function(func, message, options) {
  if (options.clear) {
    FlashMessages.clear();
  }

  func(message, options);
}
FlashMessages.sendSuccess = _.wrap(FlashMessages.sendSuccess, andClear);
FlashMessages.sendInfo = _.wrap(FlashMessages.sendInfo, andClear);
FlashMessages.sendWarning = _.wrap(FlashMessages.sendWarning, andClear);
FlashMessages.sendError = _.wrap(FlashMessages.sendError, andClear);
