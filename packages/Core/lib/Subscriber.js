import _ from 'lodash';

var Subscriber = {};

if (Meteor.isClient) {
  var Subscriber = {
    subscribeOnce(name, params) {
      const subs = Meteor.default_connection._subscriptions;
      const predicate = { name: name, params: [params] };

      if (!_.some(subs, predicate)) {
        return Meteor.subscribe(name, params);
      } else {
        return _.find(subs, predicate);
      }
    }
  };
}
export default Subscriber;

