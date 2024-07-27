const btnArea = document.querySelector(".buttons");

const playBtn = document.createElement("button");
playBtn.setAttribute("class", "play-btn");
playBtn.textContent = "Play";

const paraDisplay = document.createElement("p");
paraDisplay.setAttribute("id", "para-display");

btnArea.append(playBtn, paraDisplay);

const gameBoardContainer = document.querySelector(".content");

const gameBoard = (function () {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function insertMarker(player, row, column) {
    if (board[row][column] === "X" || board[row][column] === "O") {
      paraDisplay.textContent = "Oops, Tile Occupied!";
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

  return { board, insertMarker, switchTurn, winCheck, tieCheck };
})();

function playerCreator(marker) {
  function setMarker() {
    return marker;
  }

  // function getMarkerPosition() {
  //   gameBoardContainer.addEventListener("click", (event) => {
  //     if (event.target.tagName === "DIV") {
  //       const row = event.target.getAttribute("data-row");
  //       const column = event.target.getAttribute("data-column");
  //       return [row, column];
  //     }
  //   });
  // let row, column;
  // do {
  //   row = parseInt(prompt("Enter Marker row: "), 10);
  // } while (!(row >= 0 && row < 3) && !row === null);
  // do {
  //   column = parseInt(prompt("Enter Marker column: "), 10);
  // } while (!(column >= 0 && column < 3) && !column === null);
  // return [row, column];
  // }

  return { setMarker };
}

let player = "p1";
let row, column;

gameBoardContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "DIV") {
    row = event.target.getAttribute("data-row");
    column = event.target.getAttribute("data-column");
    if (event.target.textContent === "X" || event.target.textContent === "O") {
      paraDisplay.textContent = "Oops, Tile Occupied! Click another tile";
    } else {
      if (player === "p1") {
        event.target.textContent = "X";
      } else if (player === "p2") {
        event.target.textContent = "O";
      }
    }
  }
});

paraDisplay.textContent = "Click Play! P1: X | P2: O";

function playGame() {
  btnArea.removeChild(playBtn);

  const player1 = playerCreator("X");
  const player2 = playerCreator("O");
  let winStatus = false;
  let tieStatus = false;
  let currentMarker = "";

  do {
    if (player === "p1") {
      paraDisplay.textContent = "P1's turn, Click a tile to place 'X'";
      currentMarker = player1.setMarker();
      gameBoard.insertMarker(player, row, column);
    } else if (player === "p2") {
      paraDisplay.textContent = "P2's turn, Click a tile to place 'O'";
      currentMarker = player2.setMarker();
      gameBoard.insertMarker(player, row, column);
    }

    winStatus = gameBoard.winCheck(currentMarker, row, column);
    tieStatus = gameBoard.tieCheck(winStatus);
    player = gameBoard.switchTurn(player);
  } while (!winStatus && !tieStatus);

  if (tieStatus === true) {
    paraDisplay.textContent = "It's a Tie!";
  } else {
    if (currentMarker === "X") {
      paraDisplay.textContent = "P1(X) has won the Game!";
    } else if (currentMarker === "O") {
      paraDisplay.textContent = "P2(O) has won the Game!";
    }
  }
  playBtn.textContent = "Play again";
  btnArea.appendChild(playBtn);
}

playBtn.addEventListener("click", () => playGame());
