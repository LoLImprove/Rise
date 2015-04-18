Router.route('/', {
  name: 'root',
  template: 'Home'
});

Router.route('/replay/new', {
  name: 'replay-new',
  controller: 'Rise.Controllers.ReplayNewController'
});

Router.route('/replay/:_id', {
  name: 'replay',
  controller: 'Rise.Controllers.ReplayShowController',
});

Router.route('/replay/:_id/analysis/:analysis_id', {
  name: 'analysis-show',
  // Also the ReplayShowController, we only show ONE analysis in the template AnalysesView
  controller: 'Rise.Controllers.ReplayShowController',
});

Router.route('/profile/:username', {
  name: 'profile',
  controller: 'Rise.Controllers.UserProfileController',
});
