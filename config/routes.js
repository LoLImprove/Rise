Router.route('/', function () {
  this.render('Home');
});

Router.route('/replay/:_id', {
  name: 'replay',
  controller: 'Rise.ReplayController',
  waitOn: function() {
    return Rise.subscribe('rise:replays');
  }
});
