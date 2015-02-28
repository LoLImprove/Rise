Router.route('/', function () {
  this.render('Home');
});

Router.route('/replay/new', {
  name: 'replay-new',
  controller: 'Rise.Controllers.ReplayNewController'
});

Router.route('/replay/:_id', {
  name: 'replay',
  controller: 'Rise.Controllers.ReplayShowController',
});
