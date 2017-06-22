# _Titanic Data Visualization_

#### _This app demonstrates simple d3 javascript data visualizations using graphical visualizations of information with 2.5D presentations, Wednesday, June 20, 2017_

#### By _**Niklas Long, James Higgins, Nick Powell, Sarah. Schultz**_

## Description

_This web app provides a user driven graphical representation of data about passengers who were on the sunken Titanic vessel, sunk in 1912. The data represents 1,310 passengers of the 3,335 total passengers and crew onboard._

## Data Source

_Download Titanic passenger dataset: http://biostat.mc.vanderbilt.edu/wiki/pub/Main/DataSets/titanic3.xls_

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
* add project to Firebase https://firebase.google.com/
* select 'add Firebase to your web app' to generate API info
* in api-keys.ts write:
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

# Specifications

| Behavior | Input | Output |
|----------|:-----:|:------:|
| The application can display raw data | - | age: 22 |
| The application can display manipulated data | - | age: 22 count: 6 |
| | | |

# User Stories
* The site will allow the user to see a graph displaying the amount of passengers for each age
* The site will allow the user to see a graph displaying the amount of passengers for each gender
* The site will allow the user to see a graph displaying the ticket fare each passenger paid verses their age
* The site will allow the user to see how many people survived on the graphs displaying passengers by gender and ticket fare by age

## Known Bugs

_No known bugs._

## Support and contact details

_Please comment on Github with any questions_

## Technologies Used

* HTML
* CSS
* D3 library v4
* JavaScript
* Angular 4
* TypeScript
* Node package manager
* Firebase

### License

*This software is licensed under MIT license.*

Copyright (c) 2017 **Niklas Long, James Higgins, Nick Powell, Sarah. Schultz**
