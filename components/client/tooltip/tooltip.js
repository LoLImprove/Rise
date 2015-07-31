/*
  Renders a reactive tooltip

  {{ #render component="tooltip" when=someHelper position="right" size="full" }}
     Tooltip content
  {{ /render }}

  options:
    - when: when to display the tooltip, as a Boolean.
    - position: the position as a String (default: bottom).
    - size: the size as a String (default: default), can be "default" or "full".
*/

var tooltip = FlowComponents.define('tooltip', function(props) {
  var self = this;

  this.show = props.when;
  this.position = props.position || "bottom";
  this.size = props.size || "default";
});

tooltip.state.show = function() {
  return this.show;
};

tooltip.state.position = function() {
  return this.position;
};

tooltip.state.size = function() {
  return this.size;
};
