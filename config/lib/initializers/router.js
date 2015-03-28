Router.configure({
  layoutTemplate: 'Layout',
  loadingTemplate: 'Loading',
  notFoundTemplate: '404',

  /*load: function() {
    $('html, body').animate({ scrollTop: 0 }, 400);
    $('.content').hide().fadeIn(1000)
  },*/
  waitOn: function() {
    return Meteor.subscribe('rise:currentUser', Meteor.userId());
  },
  onRun: function() {
    Router.history.push(this.route.getName(), this.params);
    this.next();
  }

})

Router.back = (function() {
  Router.history.back();
});

Router.history = {
  _history: [],
  _rewound: false, // Indicates if we just called Router.back() and got back in history
  push: function(route, params) {
    if (this._rewound) {
      this._rewound = false;
    } else {
      this._history.push({ route: route, params: params });
    }
  },
  pop: function() {
    return this._history.pop();
  },
  back: function() {
    if (this._history.length > 1) {
      var previousState = this.previousState();
      Router.go(previousState.route, previousState.params);

      this._rewound = true;
    } else {
      console.debug("Router: can't go back further, already at initial state.");
    }
  },
  previousState: function() {
    // Can't pop the initial state
    if (this._history.length > 1) {
      this.pop();
    }

    return _.last(this._history);
  }
}
