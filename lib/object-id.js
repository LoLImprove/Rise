Rise = Rise || {};
Rise.Schemas = Rise.Schemas || {};

Rise.Schemas.ObjectID = (function() {
  if (this.isInsert && (!this.isSet || this.value.length === 0)) {
    return Mongo.ObjectID() || Random.hexString(24);
  }
});
