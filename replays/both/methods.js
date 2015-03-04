Meteor.methods({
  'rise:edit-comment': function(commentId, newValue) {
    Rise.Comments.update({ _id: commentId }, { $set: { content: newValue } });
  },
  'rise:submit-analysis-edit': function(document, updates) {
    // Build query
    var jsonDocument = JSON.stringify(document);
    var jsonUpdates = JSON.stringify(updates);
    console.log(jsonDocument, jsonUpdates, jsonDocument === jsonUpdates);

    setQuery = { $set: {} };
    if (document.general_note.content !== updates.general_note.content) {
      setQuery.$set['general_note.content'] = updates.general_note.content;
    }

    _.each(updates.timeline_entries, function(timeline_entry, index) {
      if (document.timeline_entries[index].time !== timeline_entry.time) {
        setQuery.$set['timeline_entries.' + index + '.time'] = timeline_entry.time;
      }
      if (document.timeline_entries[index].content !== timeline_entry.content) {
        setQuery.$set['timeline_entries.' + index + '.content'] = timeline_entry.content;
      }
    });

    if (!_.isEmpty(setQuery.$set)) {
      console.log('Updating analysis');
      result = Rise.Analyses.update({ _id: document._id }, setQuery);
    } else {
      result = true; // Nothing happened;
    }

    if (!!result) {
      return true;
    } else {
      throw new Meteor.Error("Could not update analysis");
    }
  }
});
