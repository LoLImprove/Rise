# Superseder

Meteor template override mechanism

## How it works

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
