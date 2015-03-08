# -- Rise

## RTS/MOBA Improvement Platform

* [Setup](#setup)
* [Design](#design)
* [Helpers](#helpers)
  * [ENV](#riseenv)
  * [Video player](#riseplayer)
  * [UI](#riseui)
* [Useful commands](#useful-commands)

## Setup

- Create a `.env` file at the root of the application
  - The following keys are required: `S3_ACCESS_KEY`, `S3_SECRET`, `S3_BUCKET`. If you don't own any S3 bucket properly configured, please read the [following link](https://github.com/Lepozepo/S3#create-your-amazon-s3) and follow the instructions.

## Design

- Rise is a Meteor package providing routes, views, models for developing subsequents RTS/MOBA Improvement Platforms.

It's data model is composed of schemas. Some bits of the schemas are editable to fit the needs of children applications.

TODO: More on that.

- Templates using this specific fields in the database should be editable via template overriding.

TODO: More on that.

## Helpers

### Rise.ENV

- `Rise.ENV.isDevelopment()`, true if running in development environment.
- `Rise.ENV.isProduction()`, true if running in production environment.
- `Rise.ENV.get(key)`, gets a `key` from the environment variables. Ex: `Rise.ENV.get('S3_BUCKET')`.

### Rise.Player

`Rise.Player`, represents the video player instance, it is only accessible on pages where the video player is loaded. You can find it's definition in `replays/client/view-models/replays/player.js#hooks.created`

- `Rise.Player.play()`: Plays the video,
- `Rise.Player.player()`: Returns the current instance of the video player,
- `Rise.Player.template`: Returns the current template instance that holds the video player,
- `Rise.Player.get('playerStatus')`: Gets the player status ("started", "stopped", "loaded", "unloaded"),
- `Rise.Player.get('playerTime'`: Gets the player time as an object `{ h: "00", m: "00", s: "00" }`,
- `Rise.Player.get('playerTime', { formatTime: true })`: Gets the player time as a string "MM:SS".

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

#### Rise.UI.lookup

Same as Rise.UI.get but looks up the ancestor chain to find the given key if it is not found in the current template's data.
Also the key can be composed of nested properties.

```javascript
  Rise.UI.lookup('timeline_entries.0.content')
```

## Useful commands

### Mongo

- Set user as admin
```bash
db.users.update({_id: "USER_ID" }, { $set: { roles: ["admin"] } } )
```
