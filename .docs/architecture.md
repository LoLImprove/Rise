# Architecure

* [File structure](#file-structure)
* [Package structure](#package-structure)

## File structure

```
.
├── config
│   │
│   ├── client/   -> Client's configuration files
│   ├── lib/      -> Configuration that must be loaded prior to everything else
│   │   └── initializers
│   │
│   ├── server/    -> Server's configuration files
│   └── routes.js  -> All routes
│
│
├── app/
│   │
│   ├── core/   -> <Core> Module, core and common stuff used in other modules/packages
│   │   │
│   │   ├── client/
│   │   │   ├── assets/        -> Stylesheets
│   │   │   ├── library/       -> Common helpers and tools
│   │   │   │    ├── modal/    -> Rise.Modal helpers (manage modals)
│   │   │   │    ├── ui/       -> Rise.UI helpers (manage view context, form validation, ...)
│   │   │   │    └── ...
│   │   │   │
│   │   │   ├── view-helpers/  -> Common template helpers
│   │   │   └── views/         -> Client layouts and common views (404 page, ...)
│   │   │       └── layouts/
│   │   │
│   │   ├── collections/       -> Mongo collections
│   │   │   └── schemas/       -> Collections schemas
│   │   │
│   │   └── server/
│   │          ├── library/         -> Common helpers and tools
│   │          ├── publications.js  -> Common publications
│   │          └── security.js      -> Global collections Allow/Deny
│   │
│   ├── replays/    -> <Replay> Module
│   └── user-auth/  -> <User auth> Module
│
│
├── lib/   -> Loaded before everything else
│   │
│   ├── vendor/
│   └── _namespaces.js  -> Rise namespace
│

```

## Package structure

Sample package structure:

```
package-name/
│
├── both/   -> Server and Client files
│   └── controllers/  -> Package specific controllers
│
├── client
│   ├── helpers/  -> Package specific template helpers and tools
│   │
│   ├── view-models/  -> Package specific view-models
│   └── views/        -> Package specific templates
│       └── shared/   -> Templates shared with other packages
│
├── server/
│   └── publications.js  -> Package specific publications
│
└── vendor/   -> Package specifics libraries
```
