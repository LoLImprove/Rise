# -- Rise

## RTS/MOBA Improvement Platform

* [Design](#design)
* [Helpers](#helpers)
  * [UI](#riseui)
* [Useful commands](#useful-commands)

## Design

- Rise is a Meteor package providing routes, views, models for developing subsequents RTS/MOBA Improvement Platforms.

It's data model is composed of schemas. Some bits of the schemas are editable to fit the needs of children applications.

TODO: More on that.

- Templates using this specific fields in the database should be editable via template overriding.

TODO: More on that.

## Helpers

### Rise.UI

#### Rise.UI.get

Around the code you'll encounter many instances of `Rise.UI.get` usages.
For instance

```javascript
Template.AnalysesView.helpers({
  analyses: function() {
    // Here we could have used this._id
    return Rise.Analyses.find({ _id: Rise.UI.get('_id') });
  },
  user: function() {
    // Here we could have used this.user_id
    return Meteor.users.findOne({ _id: Rise.UI.get('user_id') });
  }
});
```

Often, we access the data context through the use of `Rise.UI.get()` instead of `this`.
`Rise.UI.get()` actually looks for the presence of data context in multiple contexts, up to the router, and attempts to find the desired field by performing a lookup until it finds a viable data context.

## Useful commands

### Mongo

- Set user as admin
```bash
db.users.update({_id: "USER_ID" }, { $set: { roles: ["admin"] } } )
```
