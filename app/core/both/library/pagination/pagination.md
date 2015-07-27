# Rise.InfinitePagination

An infinite pagination helper insipired from https://github.com/radzserg/meteor_pagination
Designed to be used with Iron.Router.

## Publication

- Infinite Pagination will provide the `filterSelector` parameter, see `Router/Controller` code.

```javascript
Meteor.publish("rise:replays", function(filterSelector, options) {
  filterSelector = filterSelector || {};
  options = options || {};

  return Rise.Replays.find(filterSelector, options)
});
```

## View & View Model

- Make use of `.getItems` to get paginated items;
- Don't forget to add {{ > InfinitePagination }} to activate the pagination & events.

```html
<template name="ReplaysIndex">
  <ul class="replays-list">
    {{ #each paginatedReplays.getItems }}
      <li class="replay-tile">
        {{ > ReplayTile }}
      </li>
    {{ /each }}
  </ul>
  {{ > InfinitePagination }}
</template>

```

## Router/Controller

```javascript
Rise.Controllers.ReplaysIndexController = RouteController.extend({
  template: 'ReplaysIndex',
  data: function () { return { paginatedReplays: this.paginatedReplays }; },
  waitOn: function() {
    var paginatedQuery = {};// userId: Meteor.userId() };

    this.paginatedReplays = new Rise.InfinitePagination(Rise.Replays, paginatedQuery, {
      subscriptionName: "rise:replays",
      bottomOffset: 100,
      pageSize: 8,
      sort: {
        "createdAt": -1
      }
    });

    return Rise.subscribe("rise:replays", this.paginatedReplays.selector, this.paginatedReplays.getSubscriptionOptions());
  }
```
