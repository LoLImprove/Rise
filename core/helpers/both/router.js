Rise.Router = {};

Rise.Router.getPath = (function(name, data) {
  Router.routes[name].path(data);
});

Rise.Router.checkAuthentication = (function(opts) {
  var opts = opts || {};
  opts.redirectTo = opts.redirectTo || '/';

  return function() {
    if (Meteor.userId()) {
      this.next();
    } else {
      FlashMessages.sendError("You need to log in first.");
      if (opts.redirectTo === 'back') {
        history.back();
      } else {
        this.redirect(opts.redirectTo);
      }
    }
  };
});
