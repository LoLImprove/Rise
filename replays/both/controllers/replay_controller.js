Rise.ReplayController = RouteController.extend({
  template: 'replays/show',
  data: function () { return Rise.Replays.findOne({ _id: this.params._id }) }
});
