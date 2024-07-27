let player = "p1";

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
    if (player === "p1") {
      board[row][column] = "X";
    } else if (player === "p2") {
      board[row][column] = "O";
    }
  }

  function switchTurn(player) {
    player = player === "p1" ? "p2" : "p1";
  }

  return { viewBoard, insertMarker, switchTurn };
})();

function playerCreator(globalPlayer) {
  let marker = "";
  function setMarker() {
    if (globalPlayer === "p1") {
      marker = "X";
    } else if (globalPlayer === "p2") {
      marker = "O";
    }
    return marker;
  }

  function getMarkerPosition() {
    const row = parseInt(prompt("Enter Marker row: ", ""));
    const column = parseInt(prompt("Enter Marker column: ", ""));
    return row, column;
  }

  return { setMarker, getMarkerPosition };
}

const player1 = playerCreator(player);
const player2 = playerCreator(player);

