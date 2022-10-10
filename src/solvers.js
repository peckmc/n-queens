/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) { //4
  var solution = [];

  // Iterate the whole matrix
  var existIndex = [];// [0,3]
  var randomIndex;
  for (var i = 0; i < n; i++) {
    var thisRow = new Array(n).fill(0);
    do {
      randomIndex = Math.floor(Math.random() * n); // 1
    } while (existIndex.includes(randomIndex)); // [1,2,3].includes(0) === false

    existIndex.push(randomIndex);
    thisRow[randomIndex] = 1;
    solution.push(thisRow);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1;
  while (n > 1) {
    solutionCount = solutionCount * n;
    n--;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // var solution;
  // var usedColumns = [];
  // var mostRecentPiece = 0;
  // var minorDiagonals = [];
  // var majorDiagonals = [];
  // var randomIndex = Math.floor(Math.random() * n);
  // var excludeRange = [];
  // var firstAndLast = [0, n-1];
  // //get the first index
  // //for the second row, pick a index that is not the previous index, or index +/- 1
  // if (n === 2 || n === 3) {
  //   for (var i = 0; i < n; i++) {
  //     var thisRow = new Array(n).fill(0);
  //     solution.push(thisRow);
  //   }
  //   return solution;
  // }

  // for (var i = 0; i < n; i++) {
  //   var thisRow = new Array(n).fill(0);
  //   if (i > 0) {
  //     excludeRange = [mostRecentPiece - 1, mostRecentPiece, mostRecentPiece + 1];
  //   }
  //   if (n % 2 === 0 && (i === 0 || i === n - 1)){
  //     do {
  //       randomIndex = Math.floor(Math.random() * n);
  //     } while (usedColumns.includes(randomIndex) || excludeRange.includes(randomIndex) || firstAndLast.includes(randomIndex));
  //   } else { // minorDiagonals.includes(randomIndex + i) || majorDiagonals.includes(randomIndex - i)
  //     do {
  //       randomIndex = Math.floor(Math.random() * n);
  //     } while (usedColumns.includes(randomIndex) || excludeRange.includes(randomIndex));
  //   } // || minorDiagonals.includes(randomIndex + i) || majorDiagonals.includes(randomIndex - i)
  //   console.log(this);


  //   minorDiagonals.push(randomIndex + i);
  //   majorDiagonals.push(randomIndex - i);
  //   thisRow[randomIndex] = 1;
  //   usedColumns.push(randomIndex);
  //   mostRecentPiece = randomIndex;
  //   solution.push(thisRow);
  // }

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;

  // Recursive
  var solution = [];
  for (var i = 0; i < n; i++) {
    var thisRow = new Array(n).fill(0);
    solution.push(thisRow);
  }
  if (n === 1) {
    return [[1]];
  }

  if (n > 3) {
    var placedQueens = [];
    var columnIndexForEachRow = queensHelper(n, 0, placedQueens);
    // console.log("test:", columnIndexForEachRow);
    for (var i = 0; i < solution.length; i++) {
      solution[i][columnIndexForEachRow[i]] = 1;
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;

};

//Recursive helper function
var queensHelper = function (n, currRow, placedQueens) {
  for (var col = 0; col < n; col++) {
    var isSafe = true;
    if (placedQueens.length !== 0) {
      for (var i = 0; i < currRow; i++) { // used to be placedQueens.length
        if (placedQueens[i] === col || (i - placedQueens[i]) === (currRow - col) || (i + placedQueens[i]) === (currRow + col)) {
          isSafe = false;
        }
      }
    }

    if (isSafe) {
      var potentialPlacedQueens = placedQueens;
      potentialPlacedQueens.push(col);
      if (potentialPlacedQueens.length < n) {
        var potentialSolution = queensHelper(n, currRow + 1, potentialPlacedQueens);
        if (potentialSolution.length === n) {
          return potentialSolution;
        }
      } else {
        return potentialPlacedQueens; // [1,3,0,2] shows all correct col index for each row
      }
    }
  }
  return [];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
