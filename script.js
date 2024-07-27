const gameBoard = (function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function viewBoard() {
    console.table(board);
  }

  function insertMarker(player, row, column) {
    if (board[row][column] === "X" || board[row][column] === "O") {
      let rowNew, columnNew;
      do {
        alert("Position occupied by marker, pick another position!");
        do {
          rowNew = parseInt(prompt("Enter Marker row: "), 10);
        } while (!(rowNew >= 0 && rowNew < 3) && !rowNew === null);
        do {
          columnNew = parseInt(prompt("Enter Marker column: "), 10);
        } while (!(columnNew >= 0 && columnNew < 3) && !columnNew === null);
      } while (rowNew === row && columnNew === column);
      if (player === "p1") {
        board[rowNew][columnNew] = "X";
      } else if (player === "p2") {
        board[rowNew][columnNew] = "O";
      }
    } else {
      if (player === "p1") {
        board[row][column] = "X";
      } else if (player === "p2") {
        board[row][column] = "O";
      }
    }
  }

  function switchTurn(player) {
    player = player === "p1" ? "p2" : "p1";
    return player;
  }

  function winCheck(marker, row, column) {
    if (
      board[row][0] === marker &&
      board[row][1] === marker &&
      board[row][2] === marker
    ) {
      return true;
    } else if (
      board[0][column] === marker &&
      board[1][column] === marker &&
      board[2][column] === marker
    ) {
      return true;
    } else if (
      (board[0][0] === marker &&
        board[1][1] === marker &&
        board[2][2] === marker) ||
      (board[0][2] === marker &&
        board[1][1] === marker &&
        board[2][0] === marker)
    ) {
      return true;
    } else {
      return false;
    }
  }

  function tieCheck(winState) {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === "X" || board[i][j] === "O") {
          count += 1;
        }
      }
    }

    if (count === 9 && !winState) {
      return true;
    } else {
      return false;
    }
  }

  return { viewBoard, insertMarker, switchTurn, winCheck, tieCheck };
})();

function playerCreator(marker) {
  function setMarker() {
    return marker;
  }

  function getMarkerPosition() {
    let row, column;
    do {
      row = parseInt(prompt("Enter Marker row: "), 10);
    } while (!(row >= 0 && row < 3) && !row === null);
    do {
      column = parseInt(prompt("Enter Marker column: "), 10);
    } while (!(column >= 0 && column < 3) && !column === null);
    return [row, column];
  }

  return { setMarker, getMarkerPosition };
}

(function playGame() {
  let player = "p1";
  const player1 = playerCreator("X");
  const player2 = playerCreator("O");
  console.log("Player 1: X | Player 2: O");
  let winStatus = false;
  let tieStatus = false;
  let currentMarker = "";
  let row = 0,
    column = 0;
  do {
    if (player === "p1") {
      console.log("Enter player 1's marker (X) position in the prompt");
      [row, column] = player1.getMarkerPosition();
      currentMarker = player1.setMarker();
    } else if (player === "p2") {
      console.log("Enter player 2's marker (O) position in the prompt");
      [row, column] = player2.getMarkerPosition();
      currentMarker = player2.setMarker();
    }
    gameBoard.insertMarker(player, row, column);
    gameBoard.viewBoard();
    winStatus = gameBoard.winCheck(currentMarker, row, column);
    tieStatus = gameBoard.tieCheck(winStatus);
    player = gameBoard.switchTurn(player);
  } while (!winStatus && !tieStatus);

  if (tieStatus === true) {
    console.log("It's a Tie!");
  } else {
    if (currentMarker === "X") {
      console.log("Player-1(X) has won the game!");
    } else if (currentMarker === "O") {
      console.log("Player-2(O) has won the game!");
    }
  }
})();
