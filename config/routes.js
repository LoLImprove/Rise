Router.route('/', function () {
  this.render('Home');
});

Router.route('/replay/new', {
  name: 'replay-new',
  controller: 'Rise.NewReplayController'
});

Router.route('/replay/:_id', {
  name: 'replay',
  controller: 'Rise.ReplayController',
  waitOn: function() {
    return [Rise.subscribe('rise:replays'), Rise.subscribe('rise:users')];
  }
});
