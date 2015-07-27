Rise.Router = {};

// Should find a way to get the route list server side
Rise.Router.getPath = (function(name, data) {
  var route = "/";

  if (name === 'analysis-show') {
    route = "/replay/" + data._id +"/analysis/" + data.analysis_id
    if (data.anchor) {
      route = route + '#' + data.anchor;
    }
  }
  return route;
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
        Router.back();
      } else {
        this.redirect(opts.redirectTo);
      }
    }
  };
});
