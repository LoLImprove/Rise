Rise.Comments = new Mongo.Collection('comments');

Rise.Comments.attachSchema(Rise.Schemas.Comments);//, {transform: true});
Rise.Comments.attachBehaviour('timestampable', Rise.Base.TimestampableOptions);

Rise.Comments.helpers({
  user: function() {
    return Meteor.users.findOne({ _id: this.user_id });
  },
  parent: function() {
    var type = this.parent_type;
    var analysis_id = this.parent_id;

    return Rise.Analyses.findOne({ _id: analysis_id })[type]; // TODO: Check
  }
});
