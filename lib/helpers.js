Rise = Rise || {};

// TODO: Maybe should move it ?
// Helper for collections schemas autoValues
Rise.ObjectID = (function() {
  if (this.isInsert && (!this.isSet || this.value.length === 0)) {
    return Mongo.ObjectID() || Random.hexString(24);
  }
});
