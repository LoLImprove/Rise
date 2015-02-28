Rise.Controllers = Rise.Controllers || {};

Rise.Controllers.ReplayShowController = RouteController.extend({
  template: 'ReplayShow',
  data: function () { return Rise.Replays.findOne({ _id: this.params._id }) },
  waitOn: function() {
    return [
      Rise.subscribe('rise:replays'),
      Rise.subscribe('rise:users'),
      Rise.subscribe('rise:analyses'),
      Rise.subscribe('rise:comments')
    ];
  },
  action : function () {
    // Waits for the data to be loaded
    if (this.ready()) {
      this.render();
    } else {
      console.log('not ready')
    }
  }
});
