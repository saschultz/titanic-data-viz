# TitanicDataViz

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# _Titanic Vis_

#### _This app demonstrates simple d3 javascript data visualizations using graphical visualizations of information with 2.5D presentations, Wednesday, June 20, 2017_

#### By _**N.Long, J.Higgins, N. Powell, S. Schultz**_

## Description

_This web app provides a user driven graphical representation of data about passengers who were on the sunken Titanic vessel, sunk in 1912._

## Data Source

_Download Titanic passenger dataset: biostat.mc.vanderbilt.edu/wiki/pub/Main/DataSets/titanic3.xls_

## Setup/Installation Requirements

### Access Atom Files

* _Open terminal_
* _Once in terminal enter the following commands to clone the file to your desktop and open the repository:_
```
$ cd desktop
$ git clone https://github.com/n-powell/titanic-data-viz
$ cd desktop/titanic-data-viz
$ npm install
$ npm install d3-ng2-service --save
$ atom .
$ touch src/app/api-keys.ts
```
write:
```
 export var masterFirebaseConfig = {
   apiKey: "Your API info",
   authDomain: "Your API info",
   databaseURL: "Your API info",
   projectId: "Your API info",
   storageBucket: "Your API info",
   messagingSenderId: "Your API info"
 };
 ```
 ```
$ ng serve
$ open https://localhost:4200
```
## Known Bugs

_No known bugs._

## Support and contact details

_Please contact placeholder:-> google.SellsMyData@gmail.biz_

## Technologies Used

* HTML
* CSS
* D3 library
* JavaScrip
* Angular 4
* TypeScript
* Node package manager

### License

*This software is licensed under MIT license.*

Copyright (c) 2017 **_S. Schultz, N.Long, J.Higgins, N. Powell_**
