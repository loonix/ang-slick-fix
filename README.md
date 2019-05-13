# Angular-Slickgrid

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![npm version](https://badge.fury.io/js/angular-slickgrid.svg)](//npmjs.com/package/angular-slickgrid)
[![NPM downloads](https://img.shields.io/npm/dt/angular-slickgrid.svg)](https://npmjs.org/package/angular-slickgrid)
[![CircleCI](https://circleci.com/gh/ghiscoding/Angular-Slickgrid/tree/master.svg?style=shield)](https://circleci.com/gh/ghiscoding/workflows/Angular-Slickgrid/tree/master)
[![codecov](https://codecov.io/gh/ghiscoding/Angular-Slickgrid/branch/master/graph/badge.svg)](https://codecov.io/gh/ghiscoding/Angular-Slickgrid)

### Brief introduction
One of the best javascript datagrid [SlickGrid](https://github.com/mleibman/SlickGrid) which was originally developed by @mleibman is now available to Angular. I have used a few datagrids and slickgrid beats most of them in terms of functionalities and performance (it can easily deal with even a million row). We will be using the [6pac/SlickGrid](https://github.com/6pac/SlickGrid/) fork, this the most active fork since the original @mleibman fork was closed some time ago by his author for personal reasons. Also worth to know, I also contributed a lot to the 6pac/SlickGrid fork for the benefit of Angular-Slickgrid.

### Angular Compatibility
- version `1.x.x` for Angular 4 to 6 
   - Angular 6, is only supported through `rxjs-compat` as shown in this [post](https://github.com/ghiscoding/Angular-Slickgrid/issues/36#issuecomment-395710915). It's preferable to upgrade to Angular 7+ as soon as possible. 
- version `2.x.x` for Angular 7+

### NPM Package
[Angular-Slickgrid on NPM](https://www.npmjs.com/package/angular-slickgrid)

### License
[MIT License](LICENSE)

### Demo page
`Angular-Slickgrid` supports both `Bootstrap 3` and `Bootstrap 4`, you can see a demo of each one below.
- [Bootstrap 3 demo](https://ghiscoding.github.io/Angular-Slickgrid) / [examples repo](https://github.com/ghiscoding/Angular-Slickgrid/tree/master/src/app/examples)
- [Bootstrap 4 demo](https://ghiscoding.github.io/angular-slickgrid-bs4-demo) / [examples repo](https://github.com/ghiscoding/angular-slickgrid-bs4-demo/tree/master/src/app/examples)

#### Working Demo
For a complete and working local demo, you can clone the [Angular-Slickgrid Bootstrap 4](https://github.com/ghiscoding/angular-slickgrid-bs4-demo) repository. That repo is updated frequently and is the actual [Bootstrap 4 demo](https://ghiscoding.github.io/angular-slickgrid-bs4-demo).
```bash
git clone https://github.com/ghiscoding/angular-slickgrid-bs4-demo
npm install
npm start
```

#### Material Theme
Technically speaking, `Material` theme is not provided, but it should still work. 
The styling might need some adjustments to make it look like `Material` but there's over 300+ [SASS variables](https://github.com/ghiscoding/Angular-Slickgrid/blob/master/dist/styles/sass/_variables.scss), 
so I'm sure making a Material Theme is totally doable and if you do, please contribute it as a new theme to the project. Thank you. 

### Installation
Refer to the [Wiki - HOWTO Step by Step](https://github.com/ghiscoding/angular-slickgrid/wiki/HOWTO---Step-by-Step)

### Who is using Angular-Slickgrid?
Are you using Angular-Slickgrid? Add your company/site/project to the [Used by Who](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Used-by-Who%3F) list.

### You want to help and contribute?
You like the library and would like contribute? That would be awesome, the first thing you can do is head over to the [Version 2.x - Project](https://github.com/ghiscoding/Angular-Slickgrid/projects/1), there are some tasks that I would gladly like receiving help with. One of the biggest task is to increase Jest unit tests code coverage and/or more Cypress E2E tests.

## Wiki / Documentation
The Wiki is where all the documentation and instructions will go, so please consult the [Angular-Slickgrid - Wiki](https://github.com/ghiscoding/Angular-Slickgrid/wiki) before opening any issues. The [Wiki - HOWTO](https://github.com/ghiscoding/Angular-Slickgrid/wiki/HOWTO---Step-by-Step) is a great place to start with. You can also take a look at the [Demo page](https://ghiscoding.github.io/Angular-Slickgrid), it includes sample for most of the features and it keeps growing (so you might want to consult it whenever a new version comes out).

## Main features
You can see some screenshots below and the instructions down below and if that is not enough for you to decide, head over to the [Wiki - Main Features](https://github.com/ghiscoding/Angular-Slickgrid/wiki).

## Missing features
What if `Angular-Slickgrid` is missing feature(s) compare to the original core library `SlickGrid`?

Fear not and simply and use the `SlickGrid` and `DataView` objects, just like in the core lib, these are exposed  through Event Emitters. For more info continue reading on [Wiki - SlickGrid & DataView objects](/ghiscoding/Angular-Slickgrid/wiki/SlickGrid-&-DataView-Objects) and [Wiki - Grid & DataView Events](https://github.com/ghiscoding/Angular-Slickgrid/wiki/Grid-&-DataView-Events)

## Use it, like it?
You like and use this great library `Angular-Slickgrid`? You can always upvote :star: and/or contribute :)

## Like my work?
If you like my work, you can also support me with caffeine :smile:
[Buy Me a Coffee](https://ko-fi.com/N4N679OT)

## Screenshots

Screenshots from the demo app with the `Bootstrap` theme (that is the only available theme, but there is a lot of SASS variables to make it look like Material, or other theme if you wish to. If you create a new theme, please submit a PR).

### Slickgrid example with Formatters (last column shown is a custom Formatter)

#### You can also see the Grid Menu opened (aka hambuger menu)

![Default Slickgrid Example](/screenshots/formatters.png)

### Filter and Sort (clientside with DataView)

![Slickgrid Server Side](/screenshots/filter_and_sort.png)

### Editors and/or onCellClick

![Editors](/screenshots/editors.png)

### Pinned (aka frozen) Columns/Rows

![Slickgrid Server Side](/screenshots/frozen.png)

### Draggable Grouping & Aggregators

![Slickgrid Server Side](/screenshots/draggable-grouping.png)

### Slickgrid Example with Server Side (Filter/Sort/Pagination)
#### Comes with OData & GraphQL support (you can implement custom too)

![Slickgrid Server Side](/screenshots/pagination.png)
