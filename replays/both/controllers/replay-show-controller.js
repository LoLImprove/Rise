Rise.Controllers = Rise.Controllers || {};

Rise.Controllers.ReplayShowController = RouteController.extend({
  template: 'ReplayShow',
  data: function () { return Rise.Replays.findOne({ _id: this.params._id }) },
  waitOn: function() {
    return Rise.subscribe('rise:replay', this.params._id);
  },
  action : function() {
    // Waits for the data to be loaded
    if (this.ready()) {
      var self = this;
      setTimeout(function(){
        if (self.data()) {
          self.render();
        } else {
          self.render('404');
        }
      }, 3000);
    }
  }
});
