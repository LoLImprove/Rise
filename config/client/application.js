/* Subscribe to server console logs */
ConsoleMe.subscribe(); // TODO: Only dev
SimpleSchema.debug = true;
/* Flash messages config */
FlashMessages.configure({
  autoHide: true,
  hideDelay: 3000,
  autoScroll: false
});
