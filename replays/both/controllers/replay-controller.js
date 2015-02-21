Rise.ReplayController = RouteController.extend({
  template: 'ReplayShow',
  data: function () { return Rise.Replays.findOne({ _id: this.params._id }) },
  waitOn: function() {
    return [Rise.subscribe('rise:replays'), Rise.subscribe('rise:users'), Rise.subscribe('rise:analyses')];
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
