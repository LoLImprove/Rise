if (Meteor.isServer) {
  Rise.ENV = {
    _env: process.env,
    isDevelopment: function() {
      return this._env.NODE_ENV === "development";
    },
    isProduction: function() {
      return this._env.NODE_ENV === "production";
    },
    get: function(key) {
      return this._env[key];
    }
  }
}
