Template.afArrayField_TimeLineEntriesFields.helpers({
  timeValue: function() {
    parentTemplate = Template.instance().parent(1);

    // If the input already has a value, we keep it
    if (parentTemplate.view._isAttached) {
      var time = parentTemplate.$('input[name="' + this.current.time + '"]').val();
      if (time) {
        return time;
      }
    }

    // If the input does not yet have a value we set it
    return Rise.UI.lookup(this.current.time, { in: 'data' }) || Rise.Player.get('playerTime', { formatTime: true });
  }
});
