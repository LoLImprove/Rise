Meteor.methods({
  'rise:edit-comment': function(commentId, newValue) {
    Rise.Comments.update({ _id: commentId }, { $set: { content: newValue } });
  },
  'rise:submit-analysis-edit': function(document, updates) {
    var currentTimelineEntriesCount = document.timeline_entries.length;
    var query = { $set: {}, $push: {} };

    // Build query
    if (document.general_note.content !== updates.general_note.content) {
      query.$set['general_note.content'] = updates.general_note.content;
    }

    // We go through each existing timeline_entries, if they differ, we update them
    _.each(document.timeline_entries, function(timeline_entry, index) {
      if (timeline_entry.time !== updates.timeline_entries[index].time) {
        query.$set['timeline_entries.' + index + '.time'] = updates.timeline_entries[index].time;
      }
      if (timeline_entry.content !== updates.timeline_entries[index].content) {
        query.$set['timeline_entries.' + index + '.content'] = updates.timeline_entries[index].content;
      }
    });

    // We go through each new timeline_entry and only push the new ones
    _.each(updates.timeline_entries, function(timeline_entry, index) {
      if (index >= currentTimelineEntriesCount) {
        query.$push['timeline_entries'] = timeline_entry;
      }
    });

    // We filter out empty operations in the query
    query = _.omitWhen(query, function(optQuery) { return _.isEmpty(optQuery); });
    if (!_.isEmpty(query)) {
      console.log('Updating analysis');
      result = Rise.Analyses.update({ _id: document._id }, query);
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
