/*
 * - Switch Component -
 *
 *   Displays a custom radio switch potentialy linked to an existing radio input [or
 *   not].
 *
 * ----- Example ----
 *
 *   {{> render component="switch" on="On" off="Off" name="yourInputName">
 *
 *     OR
 *
 *   {{# render component="switch" on="Victory" off="Defeat" }}
 *     {{> afQuickField name='victory' }} <!-- Or anything you'd like -->
 *   {{ /render }}
 *
 */

var switchComponent = FlowComponents.define('switch', function(props) {
  var self = this;

  this.name = props.name;

  this.on = props.on || "on";
  this.onId = Random.hexString(24);

  this.off = props.off || "off";
  this.offId = Random.hexString(24);
});

Template['switch'].events({
  'change .switch-input': function(event, template) {
    var isOn = template.$('.switch-input').prop('checked');
    var input = template.$('.switch-given-input input');
    input.prop('checked', isOn);
    input.val(isOn);
  }
});

switchComponent.state.hasName = function() {
  return !(_.isUndefined(this.name) || _.isNull(this.name));
};

switchComponent.state.on = function() {
  return this.on;
};

switchComponent.state.name = function() {
  if (!(_.isUndefined(this.name) || _.isNull(this.name))) {
    return this.name;
  } else {
    return this.onId + "-name";
  }
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
