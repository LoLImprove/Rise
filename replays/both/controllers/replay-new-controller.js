Rise.Controllers = Rise.Controllers || {};

Rise.Controllers.ReplayNewController = RouteController.extend({
  template: 'ReplayNew',
  onBeforeAction: Rise.Router.checkAuthentication()
});
