import {Meteor} from 'meteor/meteor';

export default {
  // Local (client-only) collection
  collection: new Meteor.Collection(null),

  // Store flashes in the local collection
  flash(content, type) {
    type = (typeof type === 'undefined') ? 'error': type;
    this.collection.insert({content:content, type:type, seen: false});
  },

  hasMessages() {
    return this.collection.find({seen: false}).count() > 0;
  },

  hasBeenSeen(id) {
    if (typeof id === 'undefined') {
      this.collection.update({seen: false}, {$set: { seen: true }}, {multi: true});      
    } else {
      this.collection.update({_id: id}, {$set: { seen: true }});            
    }
  },

  clearSeen() {
    this.collection.remove({seen:true});
  }
};
