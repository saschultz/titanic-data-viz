

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
  console.log(ageRange);
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
  console.log(ages);
  return ages;
};


//Input: {Age: age count}. Output: [{age: a specific age, count: the number of people of that age}]
export var formatData = function(ageBreakdown) {
  console.log(ageBreakdown);
  delete ageBreakdown[NaN];

  let formattedData = [];

  for (let i in ageBreakdown) {
    if (!ageBreakdown.hasOwnProperty(i)) continue;

    formattedData.push({age: i, count: ageBreakdown[i]});
  }
  return formattedData;
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

    console.log(ageBreakdown[i]);
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


  for (let i in titanicData) {
    console.log(i);
  }
};



//BRAIN ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

export var brain = function(titanicData, selectedGraph) {
   // findAgeRange();
  let ageBreakdown = breakdownAgeCount(titanicData);
  let totalAgeCount = countTotalAgesNum(ageBreakdown);

  let agePercentages = ageByPercentage(ageBreakdown, totalAgeCount);
  let agePercentageRange = ageRangePercentage(20, 30, agePercentages);

  let ageBreakExclNaN = formatData(ageBreakdown);

  // Select a graph to display – return values

  if (selectedGraph === 1) { return [titanicData, "age", "fare"]; }
  if (selectedGraph === 2) { return [ageBreakExclNaN, "age", "count"]; }
  if (selectedGraph === 3) { return [titanicData, "age", "survived"]; }
};



// D3 ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

export var drawScatter = function(d3, preData) {

  let dataArray = brain(preData, 2);

  let data = dataArray[0],
      prop1 = dataArray[1],
      prop2 = dataArray[2];

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 1200 - margin.left - margin.right,
      height = 550 - margin.top - margin.bottom;


  // set the ranges

  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);
  // define the line



  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("div.graph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

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
        .attr("r", 3)
        .attr("cx", function(d) { return x(d[prop1]); })
        .attr("cy", function(d) { return y(d[prop2]); })
        .on("click", function(d) {
          console.log(d);
        });

    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x-axis")
        .call(d3.axisBottom(x));

    // add the Y Axis
    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));


    //UPDATE GRAPH

    d3.select("h4").on("click", function() {
      updateDrawScatter(d3, svg, x, y, height, width, margin, preData, 2);
    });

    d3.select("h3").on("click", function() {
      updateDrawScatter(d3, svg, x, y, height, width, margin, preData, 1);
    });

    d3.select("h6").on("click", function() {
      updateDrawScatter(d3, svg, x, y, height, width, margin, preData, 3);
    });
};





export var updateDrawScatter = function(d3, svg, x, y, height, width, margin, preData, selectedGraph) {

  // svg.selectAll("text").remove();

  let dataArray = brain(preData, selectedGraph); //[data, prop1, prop2]

  let data = dataArray[0],
      prop1 = dataArray[1],
      prop2 = dataArray[2];

  data.forEach(function(d) {
      d[prop1] = +d[prop1]; // formats whatever d.age is in d3.csv to number
      d[prop2] = +d[prop2];
  });

  x.domain(d3.extent(data, function(d) { return d[prop1]; })).nice();
  y.domain(d3.extent(data, function(d) { return d[prop2]; })).nice();


  svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
        .attr("r", 3)
        .attr("cx", 0)
        .attr("cy", height)
        .on("click", function(d) {
          console.log(d);
        });

  d3.selectAll("circle")
    .data(data)
    .transition()
    .duration(800)
    .attr("cx", function(d) {return x(d[prop1]);})
    .attr("cy", function(d) {return y(d[prop2]);});

  d3.selectAll("circle")
    .data(data)
    .exit()
    .transition()
    .duration(600)
    .attr("cx", 0)
    .attr("cy", height).remove();

  d3.select(".x-axis")
    .transition()
    .duration(1000)
    .call(d3.axisBottom(x));

  d3.select(".y-axis")
    .transition()
    .duration(1000)
    .call(d3.axisLeft(y));


  // label x axis
  svg.append("text")
      .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height + margin.top + 7) + ")")
      .style("text-anchor", "middle")
      .text(prop1);


  // label y axis
  svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left)
     .attr("x",0 - (height / 2))
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .text(prop2);

};


// Cluster Chart

export var nodeCluster = function() {

  var width = 1200,
      height = 550,
      center = {x: width / 2, y: height / 2};

  var survivalCenters = {
    male: {x: width / 3, y: height / 2},
    female: {x: 2 * width / 3,  y: height / 2}
  };

  var forceStrength = 0.03;

 var svg = null;
 var nodes = null;
};
