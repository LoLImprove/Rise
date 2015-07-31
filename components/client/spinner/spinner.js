var spinner = FlowComponents.define('spinner', function(props) {
  this.show = props.while;
});

spinner.state.show = function() {
  return this.show;
};
