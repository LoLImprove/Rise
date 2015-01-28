Router.route('/', function () {
  this.render('Home');
});

Router.route('/replay/:_id', {
  name: 'replay',
  controller: 'Rise.ReplayController'
});
