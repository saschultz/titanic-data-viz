

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



//BRAIN ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

export var brain = function(titanicData) {
  // findAgeRange();
  let ageBreakdown = breakdownAgeCount(titanicData);
  let totalAgeCount = countTotalAgesNum(ageBreakdown);

  let agePercentages = ageByPercentage(ageBreakdown, totalAgeCount);
  let agePercentageRange = ageRangePercentage(20, 30, agePercentages);

  let ageBreakExclNaN = formatData(ageBreakdown);

  return ageBreakExclNaN;
};
