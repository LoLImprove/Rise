var switchComponent = FlowComponents.define('switch', function(props) {
  var self = this;

  this.on = props.on || "on";
  this.onId = Random.hexString(24);

  this.off = props.off || "off";
  this.offId = Random.hexString(24);
});

switchComponent.state.on = function() {
  return this.on;
};

switchComponent.state.name = function() {
  return this.onId + "-name";
};

switchComponent.state.onId = function() {
  return this.onId;
};

switchComponent.state.offId = function() {
  return this.offId;
};

switchComponent.state.off = function() {
  return this.off;
};
