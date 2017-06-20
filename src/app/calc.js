

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
};



// D3 ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

export var draw = function(d3, preData) {

  let dataArray = brain(preData, 2); 

  let data = dataArray[0];
  let prop1 = dataArray[1];
  let prop2 = dataArray[2];

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;


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
        .on("click", function(d){
          d3.select(this).attr("cy", height);
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
      updateDraw(d3, x, y, preData, 1);
    });    

};

export var updateDraw = function(d3, x, y, preData, selectedGraph) {

  let dataArray = brain(preData, selectedGraph); //[data, prop1, prop2]

  let data = dataArray[0];
  let prop1 = dataArray[1];
  let prop2 = dataArray[2];

  data.forEach(function(d) {
      d[prop1] = +d[prop1]; // formats whatever d.age is in d3.csv to number
      d[prop2] = +d[prop2];
  });

  x.domain(d3.extent(data, function(d) { return d[prop1]; })).nice();
  y.domain(d3.extent(data, function(d) { return d[prop2]; })).nice();


  d3.selectAll("circle")
    .data(data)
    .transition()
    .duration(1000)
    .attr("cx", function(d) {return x(d[prop1]);})
    .attr("cy", function(d) {return y(d[prop2]);});

  d3.select(".x-axis")
    .transition()
    .duration(1000)
    .call(d3.axisBottom(x));

  d3.select(".y-axis")
    .transition()
    .duration(1000)
    .call(d3.axisLeft(y));
};