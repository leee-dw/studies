;
(function(global) {
  'use strict';
  var sentence = "the quick brown fox jumped over the lazy dog.";

  var words = sentence.split(" ");

  for (var i = 0; i < words.length; ++i) {
    console.log("word " + i + ": " + words[i]);
  }
})(window);



;
(function(global) {
  'use strict';
  var nums = [];
  for (var i = 0; i < 10; ++i) {
    nums[i] = i + 1;
  }
  var samenums = nums
  nums[0] = 400
  console.log(samenums[0]);
})(window);



// ----------------------------------------------------

;
(function(global) {
  'use strict';

  var nums = [9, 1, 2, 3, 4, 5];
  console.log(nums);
  for (var i = 0; i < nums.length; ++i) {
    nums[i] = nums[i + 1];
  }
  console.log(nums)

})(window);


// ---------------------------------------------------- 이차원 배열 요소 

;
(function(global) {
  'use strict';

  var grades = [
    [89, 77, 78],
    [76, 82, 81],
    [91, 94, 89]
  ]
  var total = 0;
  var average = 0.0;
  for (var row = 0; row < grades.length; ++row) {
    for (var col = 0; col < grades[row].length; ++col) {
      total += grades[row][col];
    }
    average = total / grades[row].length;
    console.log("Student" + parseInt(row + 1) + " average: " + average.toFixed(2));
    total = 0;
    average = 0.0;
  }
})(window);


// ---------------------------------------------------- 이차원 배열 요소 Row & Col 치환

;
(function(global) {
  'use strict';

  var grades = [
    [89, 77, 78],
    [76, 82, 81],
    [91, 94, 89]
  ]
  var total = 0;
  var average = 0.0;
  for (var col = 0; col < grades.length; ++col) {
    for (var row = 0; row < grades[col].length; ++row) {
      total += grades[row][col];
    }
    average = total / grades[col].length;
    console.log("Test" + parseInt(col + 1) + " average: " + average.toFixed(2));
    total = 0;
    average = 0.0;
  }
})(window);