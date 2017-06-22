

// Input: data from firebase. Output: ageRange object {max: some num, min: some num}
export var findAgeRange = function(titanicData) {
  let ageRange = {max: -1, min: 1000};

  for (let i in titanicData) {
    if (!titanicData.hasOwnProperty(i)) {continue;}

    let personAge = parseFloat(titanicData[i].age);

    if(personAge < ageRange.min) {
      ageRange.min = personAge;
    }

    if(personAge > ageRange.max) {
      ageRange.max = personAge;
    }
  }
  // console.log(ageRange);
  return ageRange;
};


//Input: data from firebase. Output: {Age: age count}
export var breakdownAgeCount = function(titanicData) {
  let ages = {};

  for (let i in titanicData) {
    if (!titanicData.hasOwnProperty(i)) {continue;}

    let personAge = parseInt(titanicData[i].age);

    if (ages[personAge] === undefined) {
      ages[personAge] = 1;
    } else {
      ages[personAge] += 1;
    }

  }
  // console.log(ages);
  return ages;
};


//Input: {Age: age count}. Output: [{age: a specific age, count: the number of people of that age}]
export var formatData = function(ageBreakdown) {
  // console.log(ageBreakdown);
  delete ageBreakdown[NaN];

  let formattedData = [];

  for (let i in ageBreakdown) {
    if (!ageBreakdown.hasOwnProperty(i)) continue;

    formattedData.push({age: i, count: ageBreakdown[i]});
  }
  return formattedData;
};

export var deleteNAN = function(data) {
  for (let i in data) {
    if (!data.hasOwnProperty(i)) {continue;}
    if ( isNaN(parseInt(data[i].age)) === true) {
      delete data[i];
    }
  }
  console.log(data);
  return data;
};


//Input: {Age: age count}. Output: all the number of ages added up – i.e. 1310 because there are that many passengers on board.
export var countTotalAgesNum = function(ageCount) { //counts number of ages
  let ageNum = null;

  for (let i in ageCount) {
    if (!ageCount.hasOwnProperty(i)) {continue;}

    ageNum += ageCount[i];
  }
  return ageNum;
};


// Input: {Age: age count}, 1310 (from countTotalAgesNum). Output: {age: percentage of people of that age}
export var ageByPercentage = function(ageBreakdown, totalAgeCount) {
  let agePercentages = {};

  for (let i in ageBreakdown) {
    if (!ageBreakdown.hasOwnProperty(i)) {continue;}

    // console.log(ageBreakdown[i]);
    agePercentages[i] = (ageBreakdown[i] * 100 / totalAgeCount);

  }

  //verification - should add up to ~100%

  let totalPercentage = null;

  for (let i in agePercentages) {
    totalPercentage += agePercentages[i];
  }

  // console.log(agePercentages);
  // console.log(totalPercentage);
  return agePercentages;
};


//Input: min age in range, max age in range, {age: percentage of people of that age}. Output: percentage for that range (num).
export var ageRangePercentage = function(min, max, agePercentages) {
  let percentage = 0;

  for (let i in agePercentages) {
    if (!agePercentages.hasOwnProperty(i)) {continue;}

    if (i >= min && i <= max && isNaN(i) === false) {
      percentage += agePercentages[i];
    }
  }

  return percentage;
};


// Input: raw data. Output: rawData with new properties for x and y values.
export var sortByGender = function(titanicData) {
  let male = [],
      female = [],
      sortedByGender = [];

  for (let i in titanicData) {
    if (titanicData[i].sex === "male") { male.push(titanicData[i]); }
    if  (titanicData[i].sex === "female") { female.push(titanicData[i]); }
  }
  sortedByGender.push(male, female);
  return sortedByGender;
};

export var assignXY = function(genderArray) {
  let male = genderArray[0],
      female = genderArray[1],
      currentMX = 10,
      currentMY = 10,
      currentFX = 45,
      currentFY = 10;


  for (let i = 0; i < male.length; i+=20) {
    for (let j = 0; j < 21; j++) {
      if (i + j < male.length) {
        male[i+j].x = currentMX;
        male[i+j].y = currentMY;
      }
      currentMX += 1;
    }
    currentMX = 10;
    currentMY += 2;
  }

  for (let i = 0; i < female.length; i+=20) {
    for (let j = 0; j < 21; j++) {
      if (i + j < female.length) {
        female[i+j].x = currentFX;
        female[i+j].y = currentFY;
      }
      currentFX += 1;
    }
    currentFX = 45;
    currentFY += 2;
  }

  let maleFemale = male.concat(female);
  return maleFemale;


};



//BRAIN ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

export var brain = function(rawData, selectedGraph) {

  let ageFareData = rawData.slice(0);
  let ageCountData = rawData.slice(0);
  let genderData = rawData.slice(0); // Really important (sortByGender and assignXY modify titanicData)


   // findAgeRange();
  let ageBreakdown = breakdownAgeCount(ageCountData);

  // let totalAgeCount = countTotalAgesNum(ageBreakdown);
  // let agePercentages = ageByPercentage(ageBreakdown, totalAgeCount);
  // let agePercentageRange = ageRangePercentage(20, 30, agePercentages);

  let ageBreakExclNaN = formatData(ageBreakdown);

  // let rawWithoutNaN = deleteNAN(ageFareData); still broken...

  let genderArray = sortByGender(genderData);
  let maleFemale = (assignXY(genderArray));


  // Select a graph to display and return it to drawScatter
  if (selectedGraph === 1) { return [rawData, "age", "fare", "scatter"]; }
  if (selectedGraph === 2) { return [ageBreakExclNaN, "age", "count", "scatter"]; }
  if (selectedGraph === 3) { return [maleFemale, "x", "y", "cluster"]; }
};



// D3 ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

export var drawScatter = function(d3, preData) {

  let dataArray = brain(preData, 2);

  let data = dataArray[0],
      prop1 = dataArray[1],
      prop2 = dataArray[2];

  let margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 1200 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;


  // set the ranges for x and y
  let x = d3.scaleLinear().range([0, width]);
  let y = d3.scaleLinear().range([height, 0]);


  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


  var div = d3.select("body").append("div")
    .attr("class", "tooltipCountAge")
    .style("opacity", 0);
  // Get the data
  // d3.csv("titanic3.csv", function(error, data) {
  //   if (error) throw error;



  // format the data
  data.forEach(function(d) {
    d[prop1] = +d[prop1]; // formats whatever d.age is in d3.csv to number
    d[prop2] = +d[prop2];
  });


  // scale the range of the data
  // d3.extent([1, 4, 3, 2]) -> [1, 4]

  x.domain(d3.extent(data, function(d) { return d[prop1]; })).nice();
  y.domain(d3.extent(data, function(d) { return d[prop2]; })).nice();


  // add the dots
  svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
      .attr("r", 2.5)
      .attr("cx", function(d) { return x(d[prop1]); })
      .attr("cy", function(d) { return y(d[prop2]); })
      .on('mouseover', function(d){
        d3.selectAll("circle").style("fill", "black")
        d3.select(this).attr("r", 5).style("fill", "black")
        // select("circle")
        div.style("opacity", .9);
        div.html(d.age + "<small>" + " people of the age " + "</small>" + d.count)

        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        d3.selectAll("circle").style("fill", "black")
        d3.select(this).attr("r", 2.5)
        div.style("opacity", 0);})
      .on("click", function(d) {
        console.log(d);
      });


  // add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "x-axis")
      .call(d3.axisBottom(x));

 // label the X Axis for graph on default load
 var xLabel = svg.append("text")
     .attr("transform",
           "translate(" + (width/2) + " ," +
                          (height + margin.top + 6.5) + ")")
     .style("text-anchor", "middle")
     .text(prop1);


  // add the Y Axis
  svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));

  // label the Y Axis for graph on default load
  var yLabel = svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(prop2);

  // title for graph on default load
  var title = svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (height / 100))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Total Passengers by Age");

  // // labels for gender cluster
  // var maleLabel = svg.append("text")
  //       .attr("x", (margin.top + 200))
  //       .attr("y", (margin.bottom))
  //       .attr("text-anchor", "middle")
  //       .attr("class", "male")
  //       .style("font-size", "20px")
  //       .text("Male");
  //
  // var femaleLabel = svg.append("text")
  //       .attr("x", (margin.top + 800))
  //       .attr("y", (margin.bottom))
  //       .attr("text-anchor", "right")
  //       .attr("class", "female")
  //       .style("font-size", "20px")
  //       .text("Female");


  //UPDATE GRAPH
  function dance() {
    d3.selectAll("circle")
      .transition()
      .attr("cx", function() { return Math.random() * width ;}) //specify range
      .attr("cy", height)
      .duration(400);
  }


  d3.select("#count-age").on("click", function() {
    dance();
    setTimeout(function() {
      updateDrawScatter(d3, svg, x, y, xLabel, yLabel, height, width, preData, 2, title, margin);
    }, 400);
  });


  d3.select("#fare-age").on("click", function() {
    dance();
    setTimeout(function() {
    updateDrawScatter(d3, svg, x, y, xLabel, yLabel, height, width, preData, 1, title, margin);
    }, 400);
  });


  d3.select("#gender").on("click", function() {
    dance();
    setTimeout(function() {
    updateDrawScatter(d3, svg, x, y, xLabel, yLabel, height, width, preData, 3, title, margin);
    }, 400);
  });


  //Drop Deceased
  d3.select("#kill-fare-age").on("click", function() {
    d3.selectAll("circle")
      .transition()
      .duration(700)
      .style("opacity", function(d) {
        if (d.survived === "0") {
          return 1e-6;
        } else {
          return 100;
        }
      })
      .attr("cy", function(d) {
        if (d.survived === "0") {
          return height;
        } else {
          return y(d.fare);
        }
      });
  });


  d3.select("#kill-gender").on("click", function(d) {
  d3.selectAll("circle")
    .transition()
    .duration(800)
    .style("opacity", function(d) {
      if (d.survived === "0") {
        return 1e-6;
      } else {
        return 100;
      }
    })
    .attr("cy", function(d) {
      if (d.survived === "0") {
        return Math.random() * 250000;
      } else {
        return y(d.y);
      }
    });
  });
}; // END drawScatter FUNCTION

export var updateDrawScatter = function(d3, svg, x, y, xLabel, yLabel, height, width, preData, selectedGraph, title, margin) {

  var div = d3.select("body").append("div")
    .attr("class", "tooltipCluster")
    .style("opacity", 0);

  let dataArray = brain(preData, selectedGraph); //[data, prop1, prop2]

  let data = dataArray[0],
      prop1 = dataArray[1],
      prop2 = dataArray[2],
      type = dataArray[3];

  data.forEach(function(d) {
    if (+d[prop1] !== 0) { // excludes undefined ages - It's a very bad fix to the problem!!!
      d[prop1] = +d[prop1]; // formats whatever d.age is in d3.csv to number
      d[prop2] = +d[prop2];
    }
  });


 if (type === "scatter") {
    x.domain(d3.extent(data, function(d) { return d[prop1]; })).nice();
    y.domain(d3.extent(data, function(d) { return d[prop2]; })).nice();
  } else if (type === "cluster") {
    x.domain([0, 100]);
    y.domain([0, 100]);

    // labels for gender cluster
    var maleLabel = svg.append("text")
          .attr("x", (margin.top + 200))
          .attr("y", (margin.bottom))
          .attr("text-anchor", "middle")
          .attr("class", "male")
          .style("font-size", "20px")
          .text("Male");

    var femaleLabel = svg.append("text")
          .attr("x", (margin.top + 568))
          .attr("y", (margin.bottom + 200))
          .attr("text-anchor", "right")
          .attr("class", "female")
          .style("font-size", "20px")
          .text("Female");
  } else {
    console.log("wut?");
  }

  function updateXLabel() {
    xLabel
      .text(prop1)
  }

  function updateYLabel() {
    yLabel
      .text(prop2)
  }

  function updateTitle() {
    console.log(selectedGraph);
    if (selectedGraph === 1) {
      title
        .text("Ticket Fare by Age");
    } else if (selectedGraph === 2) {
      title
        .text("Total Passengers by Age")
    } else if (selectedGraph === 3) {
      title
        .text("Total Passengers by Gender");
      // legend();
    }
  }

  updateXLabel();
  updateYLabel();
  updateTitle();

  // legend for gender graph
  // function legend() {
  //   var legend = svg.append('g')
  //   .attr("class","legend")
  //   .attr("transform","translate(50,30)")
  //   .style("font-size","12px")
  //   .call(d3.legend)
  // }

  svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
      .attr("r", 2.5)
      .attr("cx", function() {return Math.random() * 6000;})
      .attr("cy", height)
      .style("opacity", 0)
      .on('mouseover', function(d){
        d3.selectAll("circle").style("fill", "white")
        d3.select(this).attr("r", 5).style("fill", "black")
        div.transition()
          .duration(20)
          .style("opacity", .9);
        div.html(d.name + "<small>" + " age " + "</small>" + d.age)
        .style("left", (d3.event.pageX + 30) + "px")
        .style("top", (d3.event.pageY - 28) + "px");

      })
      .on("mouseout", function(d) {
        d3.selectAll("circle").style("fill", "black")
        d3.select(this).attr("r", 2.5)
        div.style("opacity", 0);
       })
      .on("click", function(d) {
        console.log(d);
      });



    d3.selectAll("circle")
      .data(data)
      .exit()
      .transition()
      .duration(900)
      .attr("cy", function() {return Math.random() * -60000;})
      .remove();

    d3.selectAll("circle")
      .data(data)
      .transition()
      .duration(700)
      .style("opacity", 100)
      .attr("cx", function(d) {return x(d[prop1]);})
      .attr("cy", function(d) {return y(d[prop2]);});


    //AXIS

    if (type === "scatter") {
      d3.select(".x-axis")
        .transition()
        .duration(800)
        .style("opacity", 100)
        .call(d3.axisBottom(x));
      xLabel
        .style("opacity", 1);

      d3.select(".y-axis")
        .transition()
        .duration(800)
        .style("opacity", 100)
        .call(d3.axisLeft(y));
      yLabel
        .style("opacity", 1);

    } else if (type === "cluster") {
      d3.select(".x-axis")
        .transition()
        .duration(800)
        .style("opacity", 1e-6);
      xLabel
        .transition()
        .style("opacity", .2e-6)
        .duration(800);

        d3.select(".y-axis")
          .transition()
          .duration(800)
          .style("opacity", 1e-6);
        yLabel
          .transition()
          .style("opacity", .2e-6)
          .duration(800);

    }
}; // END updateDrawScatter FUNCTION
