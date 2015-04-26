# Superseder

Meteor Template & Schemas override mechanisms

* [Setup](#templates)
* [Design](#schemas)

## Schemas

You can override any schema from inside another package.
The idea is that packages are loaded first thus we register an override in the package and then call the `override` method where the original schema is defined.

### Original schema

The original schema must add the line `Superseder.Schema.override(object, schemaKeyName)`
**`Superseder.Schema.override()` keeps the default schema if no override has been registered.**

```javascript
Rise.Schemas = Rise.Schemas || {};

Rise.Schemas.UserProfile = new SimpleSchema({
  level_of_play: { type: String },
  IGN: { type: String, optional: true },
  avatar: { type: String, optional: true }
});
Superseder.Schema.override(Rise.Schemas, 'UserProfile');
```

### Override

This file is in a local package or something, and declares a new override.

```javascript

Superseder.Schema.registerOverride('UserProfile', new SimpleSchema({
  league: { type: String },
  IGN: { type: String, optional: true },
  avatar: { type: String, optional: true }
}));
```

## Templates

You can override any template from inside another package.

### Original files
```html
<!-- Original template -->
<template name="ReplayTile">
   ...
</template>
```

```javascript
// Original helpers, events, hooks
Template.ReplayTile.helpers({...})
//...
```

### In the package overriding the original files

- Files should be in `*feature-name*/client/overrides/*template-name*/`
  - For instance `packages/LeagueOfLegends/replays/client/overrides/replay-tile/{lol-replays-tile.js | lol-replay-tile.html | override.js}`
- You need to add an `override.js` file which will call `Superseder`.

#### Override.js
```javascript```
// override.js
Superseder.override("ReplayTile", { with: "HearthstoneReplaysTile" });
```

#### Template[.html]|[.js]
```html
<!-- Newly define override, hearthstone-replay-tile.html -->
<template name="HearthstoneReplayTile">
   ...
   ...
</template>
```

```javascript
// Newly define override's helpers, events, hooks, hearthstone-replay-tile.js
Template.HearthstoneReplayTile.helpers({.......});
// ...
```
