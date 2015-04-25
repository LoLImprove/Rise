Rise.Controllers = Rise.Controllers || {};

Rise.Controllers.ReplaysIndexController = RouteController.extend({
  template: 'ReplaysIndex',
  data: function () { return { paginatedReplays: this.paginatedReplays }; },
  waitOn: function() {
    var paginatedQuery = {};// userId: Meteor.userId() };

    this.paginatedReplays = new Rise.InfinitePagination(Rise.Replays, paginatedQuery, {
      subscriptionName: "rise:replays",
      bottomOffset: 100,
      pageSize: 8,
      sort: {
        "createdAt": -1
      }
    });

    return Rise.subscribe("rise:replays", this.paginatedReplays.selector, this.paginatedReplays.getSubscriptionOptions());
  }
  /*,
  action : function() {
    // Waits for the data to be loaded
    if (this.ready()) {
      var self = this;
      if (self.data()) {
        self.render();
      } else {
        self.render('404');
      }
    }
  }*/
});
