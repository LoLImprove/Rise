Slingshot.fileRestrictions("ReplayUploader", {
  allowedFileTypes: null,
  maxSize: 20 * 1024 * 1024 // 10 MB (use null for unlimited).
});

if (Meteor.isServer) {
  Slingshot.createDirective("ReplayUploader", Slingshot.S3Storage, {
    bucket: Meteor.settings.AWSBucket,
	  region: Meteor.settings.AWSRegion,
    acl: "public-read",

    authorize: function () {
      //Deny uploads if user is not logged in.
      if (!this.userId) {
        var message = "Please login before posting files";
        throw new Meteor.Error("Login Required", message);
      }

      return true;
    },

    key: function (file) {
      //Store file into a directory by the user's username.
      var user = Meteor.users.findOne(this.userId);
      return 'replays/' + user.username + "/" + file.name;
    }
  });
}

