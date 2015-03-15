# Packages

* [Routing & Sessions](#routing--sessions)
* [Authentification](#authentication)
* [Security](#security)
* [Collections](#collections)
* [Collections behaviors](#collections-behaviors)
* [Fixtures](#fixtures)
* [Publications & Subscriptions](#pubssubs)
* [File upload](#upload)
* [Mailing](#mailing)
* [UI & View](#ui--view-helpers)
* [Style](#style)
* [Misc](#misc)

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

#### Security

- [Security](https://github.com/ongoworks/meteor-security/)
  - Better security for collections through the server/security.js file

- [Browser Policy](https://atmospherejs.com/meteor/browser-policy)

- [.ENV](https://atmospherejs.com/pauldowman/dotenv)
  - .env file holds environment variables

### Collections

- [Collection helpers](https://github.com/dburles/meteor-collection-helpers/)
  - Used mainly to setup relations in a NoSQL environment

- [Collection hooks](https://github.com/matb33/meteor-collection-hooks)
  - Before/After [Insert/Update/Remove/Find]

- [Collection 2](https://github.com/aldeed/meteor-collection2/)
  - Schema validation for NoSQL collections

#### Collections behaviors
- [Soft Removable](https://atmospherejs.com/zimme/collection-softremovable)
  - Enable soft removal for a collection (useful for reports and stuffs)

- [Timestampable](https://atmospherejs.com/zimme/collection-timestampable)
  - Enables automated timestamps for a collection

#### Fixtures

- [Fake](https://github.com/anticoders/meteor-fake/)
  - Faker for Meteor.js
- [Factory](https://github.com/percolatestudio/meteor-factory/)
  - FactoryGirl for Meteor.js

### Pubs/Subs

- [SubsManager](https://github.com/meteorhacks/subs-manager/)
  - Cache subscriptions and manage them

- [Publish composite](https://github.com/englue/meteor-publish-composite/)
  - Reactive updating for published aggregates (top 10 posts, etc...)

### Upload
- [S3](https://github.com/Lepozepo/S3)
  - S3 uploader

### Mailing
- [Meteor email](https://github.com/ideaq/meteor-email)

### UI & View Helpers

- [Typeahead](https://atmospherejs.com/comerc/bs-typeahead)
  - Autocompletion

- [MomentJS](https://github.com/acreeger/meteor-moment)
  - Date formatting

- [Identicon](https://github.com/hillmark/meteor-identicon)
  - Identicons for avatars

- [Template extension](https://github.com/aldeed/meteor-template-extension)
  - Template.parent(), template inheritance, hooks...

- [Template Helpers](https://atmospherejs.com/raix/handlebar-helpers)
  - $or, $and, $.console.log

- [Flash Messages](https://github.com/camilosw/flash-messages)
  - JS Flash messages + view helper

- [Autoform](https://github.com/aldeed/meteor-autoform/)
  - UI Helpers for forms and validations

- [Autoform typeahead](https://atmospherejs.com/comerc/autoform-typeahead)

- [Bootbox](https://atmospherejs.com/mizzao/bootboxjs)
  - Modal and prompts

- [Momentum](https://github.com/percolatestudio/meteor-momentum)
  - Animations

### Style

- [LESS](https://atmospherejs.com/meteor/less)
  - CSS Preprocessing

- [Font-awesome](https://atmospherejs.com/natestrauser/font-awesome)
  - Icons

### Misc

- [Reactive Var]
- [Underscore.js String](https://atmospherejs.com/wizonesolutions/underscore-string)
- [Underscore.js Contrib](https://github.com/zimme/meteor-underscore-contrib)
  - Frackton of utility in addition to Underscore.js
- [Mongol](https://atmospherejs.com/msavin/mongol)
  - Ctrl-M triggers it, allows to inspect the db in dev environment
- [Console Log Server Side -> Client side](https://github.com/aldeed/meteor-console-me/)
