Rise.Router = {};

Rise.Router.checkAuthentication = (function(opts) {
  var opts = opts || {};
  opts.redirectTo = opts.redirectTo || '/';

  return function() {
    if (Meteor.userId()) {
      this.next();
    } else {
      if (opts.redirectTo === 'back') {
        history.back();
      } else {
        this.redirect(opts.redirectTo);
      }
    }
  };
});
