import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';

import { FirebaseListObservable } from 'angularfire2/database';
import { PassengerService } from '../passenger.service';

import * as calc from '../calc.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  providers: [PassengerService]
})
export class GraphComponent implements OnInit {

  passengers;
  processedData;

  private d3: D3;
  private parentNativeElement: any;

  constructor(element: ElementRef, d3Service: D3Service, private passengerService: PassengerService) { 
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    let d3 = this.d3;
    let d3ParentElement: Selection<any, any, any, any>;

    if (this.parentNativeElement !== null) {

      d3ParentElement = d3.select(this.parentNativeElement);

      // Do d3 stuff
    }

    this.passengerService.getPassengers().subscribe(data => {
      this.passengers = data;
      this.processedData = calc.brain(this.passengers);
      this.draw(this.processedData);
    });
  }

  draw = function(data) {

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;


  // set the ranges

  var x = this.d3.scaleLinear().range([0, width]);
  var y = this.d3.scaleLinear().range([height, 0]);
  // define the line



  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = this.d3.select("div.graph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // Get the data
  // this.d3.csv("titanic3.csv", function(error, data) {
  //   if (error) throw error;

    console.log(data);
    
    // format the data
    data.forEach(function(d) {
        d.age = +d.age; // formats whatever d.age is in this.d3.csv to number
        d.count = +d.count;
    });

    // scale the range of the data
    // this.d3.extent([1, 4, 3, 2]) -> [1, 4]
    x.domain(this.d3.extent(data, function(d) { return d.age; })).nice();
    y.domain(this.d3.extent(data, function(d) { return d.count; })).nice();

    // add the dots
    svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return x(d.age); })
        .attr("cy", function(d) { return y(d.count); })
        .on("click", (d => {
          
          console.log(d);
        
        }))

    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(this.d3.axisBottom(x));

    // add the Y Axis
    svg.append("g")
        .call(this.d3.axisLeft(y));
  // });
  };
}
