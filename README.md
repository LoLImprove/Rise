# -- Rise

## RTS/MOBA Improvement Platform

* [Setup](#setup)
  * [ENV](#env)
  * [Config files](#config)
* [Design](#design)
* [Helpers](#helpers)
  * [Config](#riseconfig)
  * [ENV](#riseenv)
  * [Router](#router)
  * [Notifications](#notifications)
  * [User Scoring](#user-scoring)
* [Video player](#riseplayer)
  * [UI](#riseui)
* [Useful commands](#useful-commands)

## Setup

### ENV

- Create a `.env` file at the root of the application (see: `.env.example` too)
  - The following keys are required: `S3_ACCESS_KEY`, `S3_SECRET`, `S3_BUCKET`. If you don't own any S3 bucket properly configured, please read the [following link](https://github.com/Lepozepo/S3#create-your-amazon-s3) and follow the instructions.
  - If you need mailing add the following keys: `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_SERVER`, `SMTP_PORT` (default: 25)

### Config

- `config/`
  - Holds the routes, configuration files and initializers for both client and server

- `private/`
  - Holds the server static files such as `notifications.yml` and translation files.

## Design

- Rise is a Meteor package providing routes, views, models for developing subsequents RTS/MOBA Improvement Platforms.

### Platforms packages

__** FOR GAME SPECIFIC FEATURES, PLEASE DO NEVER MODIFY ORIGINAL TEMPLATES BUT INSTEAD CREATE OVERRIDES IN THE GAME'S OWN PACKAGE **__

In the `packages/` directory are game-specific packages such as `LeagueOfLegends` or `HeroesOfTheStorm`

Run `meteor add <package-name>` to enable a specific game package to be loaded ! (`<package-name>` must be in lowercase, with dash separated words, i.e: `meteor add league-of-legends`)
Please make sure you are only loading one of the packages as they could conflict. Check your `.meteor/packages` file beforehand.
To remove an existing package, just use `meteor remove <package-name>`;

#### Package Achitecture
```
packages/
├── league-of-legends/
│   │
│   ├── lib/      -> Package files that must be loaded beforehand
│   ├── assets/   -> Package specific assets
│   ├── *feature-name*/  -> Some feature (ex: replays)
│   │   └── client/
│   │       └── overrides/
│   │           └── *template-name*/  -> Overriden template, (ex: replay-tile)
│   │               ├── *[package-prefix]template-name.js*/   -> (ex: lol-replay-tile.js)
│   │               ├── *[package-prefix]template-name.html*/ -> (ex: lol-replay-tile.html)
│   │               └── override.js  -> Contains the override call
│   │
│   ├── collections/  -> Package specific collections
│   └── package.js    -> Package configuration where files are required
│
├── hearthstone/
│   │
│   └── ... <- Same
│
└── ...
```

#### Package specific schemas

Any schema (outside of the ones declared in game-specific packages) can be overriden.
To do so we use the `Superseder` package. See `packages/Superseder/readme.md` for examples.

Alternatively you can declare **new schemas** as you want, as long as you include them through an overriden schema or within a new feature.

#### Package specific templates

Any template (outside of the ones declared in game-specific packages) can be overriden.
To do so we use the `Superseder` package. See `packages/Superseder/readme.md` for examples.

Alternatively you can declare **new templates** as you want, as long as you include them through an overriden template or within a new feature.

### Customization

It's data model is composed of schemas. Some bits of the schemas are editable to fit the needs of children applications.

TODO: More on that.

- Templates using this specific fields in the database should be editable via template overriding.

TODO: More on that.

## Helpers

### Rise.ENV

- `Rise.ENV.isDevelopment()`, true if running in development environment.
- `Rise.ENV.isProduction()`, true if running in production environment.
- `Rise.ENV.get(key)`, gets a `key` from the environment variables. Ex: `Rise.ENV.get('S3_BUCKET')`.

### Rise.Config

- `Rise.Config.load(fileName)`, loads a named yaml file living in `config/server/private`

### Router

**/!\ ALL ROUTES MUST HAVE A NAME /!\**

See `rise/config/lib/initializers/router.js`
- `Router.history.back()` tells the router to go the previous page inside the application

### Notifications

- `Notify(type, opts)`, server side helper to send notification from a user to another one
  - The `type` argument must be one of the keys in `private/notifications.yml`

```javascript
// Server side
Notify("analysis:insert", {
  link: Rise.Router.getPath('analysis-show', { _id: analysis.replay_id, analysis_id: analysis._id }),
  from: userId,
  to: Rise.Replays.findOne(analysis.replay_id).user_id
});
```

### User Scoring

- `Rise.Scoring.addPoints({ to: userId, for: keyInScoringTable });`, server side helper to reward an user with points. For instance after an analysis.
  - The `to` argument must be a user object or an user id.
  - The `for` argument must be a key present in the `private/score-table.yml` file. You can add some of course.

```javascript
if (Meteor.isServer) {
  Rise.Replays.after.insert(function(userId, replay) {
    Rise.Scoring.addPoints({ to: userId, for: "replay:insert" });
  });
}
```

### Rise.Player

`Rise.Player`, represents the video player instance, it is only accessible on pages where the video player is loaded. You can find it's definition in `replays/client/view-models/replays/player.js#hooks.created`

- `Rise.Player.play()`: Plays the video,
- `Rise.Player.player()`: Returns the current instance of the video player,
- `Rise.Player.template`: Returns the current template instance that holds the video player,
- `Rise.Player.get('playerStatus')`: Gets the player status ("started", "stopped", "loaded", "unloaded"). **This is a reactive value**.
- `Rise.Player.get('playerTime'`: Gets the player time as an object `{ h: "00", m: "00", s: "00" }`,
- `Rise.Player.get('playerTime', { formatTime: true })`: Gets the player time as a string "MM:SS".

### Rise.UI

#### Rise.UI.lookup
You'll see many instances of `Rise.UI.lookup` around here. This methods looks up through the a template's ancestors chain for a specific property or key.

```javascript
  // Looks up in the current template's ancestors chain for the `timeline_entries.0.content` key in the `data` property.
  Rise.UI.lookup('timeline_entries.0.content', { in: 'data'});

  // Looks up for a template's direct property in the template's ancestor chain
  Rise.UI.lookup('expandable');
```

##### What this solves

`Rise.UI.lookup` is mostly used to get a hold of template properties defined in `created` or `rendered` hooks. This is because **block helpers may retain the `data` attribute but loses all other properties.** Thus, in a template, if we are inside block helper we will lose access to the property.

See the following (failing) example :

```javascript
Template.AnalysisShow.hooks({
  created: function() {
    this.expanded = new ReactiveVar(true);
  }
});

Template.AnalysisShow.helpers({
  expanded: function() {
    // This fails because of the pecular html we got (see below)
    return Template.instance().expanded.get(); // How we usually get a template's property
  }
});
```
```html
  {{ #momentum plugin="slide-height" }} <--- Block helper messing with us because it's a new template instance with the same `data` attributes but different template properties
    {{ #if expanded }}
      Bla
    {{ /if }}
  {{ /momentum }}
```

But accessing `expanded` through `Rise.UI.lookup('expanded')` solves this issue.


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

### Rise.Router

#### checkAuthentication

Router onBeforeAction helper, if the user is not logged in, redirects to `/` or the desired path.

```javascript
SomeRouteOrController = RouteController.extend({
  template: SomeTemplate',
  onBeforeAction: Rise.Router.checkAuthentication({ redirectTo: 'back' })
});
```


## Useful commands

### Mongo

- Set user as admin
```bash
db.users.update({_id: "USER_ID" }, { $set: { roles: ["admin"] } } )
```
