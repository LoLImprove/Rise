Rise.Controllers = Rise.Controllers || {};

Rise.Controllers.ReplayShowController = RouteController.extend({
  template: 'ReplayShow',
  data: function () { return Rise.Replays.findOne({ _id: this.params._id }) },
  waitOn: function() {
    return Rise.subscribe('rise:replay', this.params._id);
  },
  onBeforeAction: function() {
    if (this.data()) {
      this.next();
    } else {
      this.render('404');
    }
  },
  action : function () {
    // Waits for the data to be loaded
    if (this.ready()) {
      var self = this;
      setTimeout(function(){
        self.render();
      }, 3000);
    } else {
      console.log('not ready')
    }
  }
});
