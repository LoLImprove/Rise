if (Meteor.isClient) {
  Rise.SubscriptionManager = new SubsManager();
  // Better looking than Rise.SubscriptionManager.subscribe
  Rise.subscribe = function() {
    // We need to keep the context, Rise.SubscriptionManager
    Rise.SubscriptionManager.subscribe.apply(Rise.SubscriptionManager, arguments);
  }
} else {
  // Just to keep a consistent API
  Rise.publish = Meteor.publish;
  Rise.publishComposite = Meteor.publishComposite;
}
