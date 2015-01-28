# Rise RTS/MOBA Improvement Platform

## Packages :

### Routing & Sessions

- iron:router
- [Persistent Sessions](https://github.com/okgrow/meteor-persistent-session/)
  - Adds an API for persistent session storage

- [Router Auth](https://github.com/zimme/meteor-iron-router-auth/)
  - Adds necessity for authentication on specified routes

- [Route active](https://github.com/zimme/meteor-iron-router-active)
  - Adds "isActiveRoute" helper to views

### Authentication

- [UserAccounts#Core](https://atmospherejs.com/useraccounts/unstyled)
  - Sign in and Sign up templates
  - See : https://github.com/meteor-useraccounts/core#css-rules
  - And : https://github.com/meteor-useraccounts/core/blob/master/Guide.md#available-styled-versions

 [AccountPassword](https://atmospherejs.com/meteor/accounts-password)
  - Login with password

### Collections

- [Collection helpers](https://github.com/dburles/meteor-collection-helpers/)
  - Used mainly to setup relations in a NoSQL environment

- [Collection hooks](https://github.com/matb33/meteor-collection-hooks)
  - Before/After [Insert/Update/Remove/Find]

- [Collection 2](https://github.com/aldeed/meteor-collection2/)
  - Schema validation for NoSQL collections

#### Security

- [Security](https://github.com/ongoworks/meteor-security/)
  - Better security for collections through the server/security.js file

- [Browser Policy](https://atmospherejs.com/meteor/browser-policy)

#### Fixtures

- [Fake](https://github.com/anticoders/meteor-fake/)
  - Faker for Meteor.js
- [Factory](https://github.com/percolatestudio/meteor-factory/)
  - FactoryGirl for Meteor.js

#### Behaviors
- [Soft Removable](https://atmospherejs.com/zimme/collection-softremovable)
  - Enable soft removal for a collection (useful for reports and stuffs)

- [Timestampable](https://atmospherejs.com/zimme/collection-timestampable)
  - Enables automated timestamps for a collection

### Pubs/Subs

- [SubsManager](https://github.com/meteorhacks/subs-manager/)
  - Cache subscriptions and manage them

- [Publish composite](https://github.com/englue/meteor-publish-composite/)
  - Reactive updating for published aggregates (top 10 posts, etc...)

### UI & View Helpers
- [Autoform](https://github.com/aldeed/meteor-autoform/)
  - UI Helpers for forms and validations

- [Accounts-UI](https://atmospherejs.com/meteor/accounts-ui)
  - UI For login