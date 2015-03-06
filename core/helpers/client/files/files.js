Rise.Files = {
  authorizedMaxSize: 2, // in Mb, will be approximate
  authorizedMIMETypes: {
    images: ['image/gif', 'image/jpeg', 'image/png'],
    applications: ['application/StormReplay', 'application/lrf'],
  },
  addMIMEType: function(type, name) {
    this.authorizedMIMETypes[type] = this.authorizedMIMETypes[type] || [];
    this.authorizedMIMETypes[type].push(name);
  }
}

// Uploads a file or returns a 415 error to be handled

// TODO: Should handle multipe MIMETypes (like images + applications)
// TODO: Should handle mutliple files validation
Rise.Files.upload = function(files, opts, cb) {
  opts["allow"] = opts["allow"] || "images";
  opts["dir"] = opts["dir"] || "/uploads/";

  var megabyte = 1048576,
      sizeInMb = files[0].size / megabyte,
      type = files[0].type;

  if (type === "") {
    var ext = files[0].name.split('.').pop();
    type = "application/" + ext;
  }

  if (_.contains(this.authorizedMIMETypes[opts["allow"]], type) && sizeInMb <= this.authorizedMaxSize) {
    return S3.upload(files, opts["dir"], cb);
  } else {
    return new Meteor.Error(415, "File upload error: File should be under " + this.authorizedMaxSize + " Mb and be of one of those types: " + this.authorizedMIMETypes[opts["allow"]].join(", "));
  }

}
