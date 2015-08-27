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

window.findNRooksSolution = function(n) {
  var solution = [];
  var row = n;
  var col = n;
  var boardFound = false;

  var placer = function(board) {
    if (row === 0) {
      solution.push(board);
      boardFound = true;
    } else {
      for (var i = col - 1; i >= 0; i--) {
        board.togglePiece(row - 1, i);
        if (!board.hasAnyRooksConflicts()) {
          row--;
          placer(board);
          row++;
        }
        if (boardFound) {
          break;
        } else {
          board.togglePiece(row - 1, i);
        }
      }
    }
  };

  placer(new Board({n: n}));
  return solution.pop().rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var row = n;
  var col = n;

  var placer = function(board) {
    if (row === 0) {
      solutionCount++;
    } else {
      for (var i = col - 1; i >= 0; i--) {
        board.togglePiece(row - 1, i);
        if (!board.hasAnyRooksConflicts()) {
          row--;
          placer(board);
          row++;
        }
        board.togglePiece(row - 1,i);
      }
    }
  };

  placer(new Board({n: n}));

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solution = [];
  var row = n;
  var col = n;
  var board = new Board({n: n});
  var boardFound = false;

  var placer = function(board) {
    if (row === 0) {
      solution.push(board);
      boardFound = true;
    } else {
      for (var i = col - 1; i >= 0; i--) {
        board.togglePiece(row - 1,i);
        if (!board.hasAnyQueensConflicts()) {
          row--;
          placer(board);
          row++;
        }
        if (boardFound) {
          break;
        }
        board.togglePiece(row - 1,i);
      }
    }
  };

  placer(board);

  if (solution.length > 0) {
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution[solution.length - 1]));
    return solution.pop().rows();
  } else {
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(board));
    return board.rows();
  }
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var row = n;
  var col = n;

  var placer = function(board) {
    if (row === 0) {
      solutionCount++;
    } else {
      for (var i = col - 1; i >= 0; i--) {
        board.togglePiece(row - 1, i);
        if (!board.hasAnyQueensConflicts()) {
          row--;
          placer(board);
          row++;
        }
        board.togglePiece(row - 1,i);
      }
    }
  };

  placer(new Board({n: n}));

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};