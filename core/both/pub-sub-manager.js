if (Meteor.isClient) {
  Rise.SubscriptionManager = new SubsManager();
  // Better looking than Rise.SubscriptionManager.subscribe
  Rise.subscribe = function(arguments) {
    Rise.SubscriptionManager.subscribe.call(Rise.SubscriptionManager, arguments); // We need to keep the context
  }
} else {
  // Just to keep a consistent API
  Rise.publish = Meteor.publish;
}
