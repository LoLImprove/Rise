// Uses Mongo Collection Instances package

Meteor.methods({
  'pagination:pagesCount': function(collectionName, selector) {
    var collection = Mongo.Collection.get(collectionName);
    return collection.find(selector).count();
  }
});
