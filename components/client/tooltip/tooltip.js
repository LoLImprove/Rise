var tooltip = FlowComponents.define('tooltip', function(props) {
  var self = this;

  this.show = props.when;
});

tooltip.state.show = function() {
  return this.show;
};
