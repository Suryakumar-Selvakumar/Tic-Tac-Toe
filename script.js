const btnArea = document.querySelector(".buttons");

const playBtn = document.createElement("button");
playBtn.setAttribute("class", "play-btn");
playBtn.textContent = "Play";

const paraDisplay = document.createElement("p");
paraDisplay.setAttribute("id", "para-display");

btnArea.append(playBtn, paraDisplay);

const gameBoardContainer = document.querySelector(".content");
const gameBoardDiv = document.querySelector(".game-board");

gameBoardContainer.removeChild(gameBoardDiv);

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

  function clearBoard() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        board[i][j] = "";
      }
    }
  }

  return { insertMarker, switchTurn, winCheck, tieCheck, clearBoard };
})();

function playerCreator(marker) {
  function setMarker() {
    return marker;
  }
  return { setMarker };
}

paraDisplay.textContent = "Click Play! P1: X | P2: O";
let playAgainStatus = true;

playBtn.addEventListener("click", () => {
  btnArea.removeChild(playBtn);
  gameBoardContainer.appendChild(gameBoardDiv);
  gameBoard.clearBoard();
  for (const child of gameBoardDiv.children) {
    child.textContent = "";
  }
  paraDisplay.textContent =
    "Game Begins! It's P1's turn, Click a tile to place 'X'";
  playAgainStatus = true;
});

let player = "p1";
let row, column;

gameBoardDiv.addEventListener("click", (event) => {
  const player1 = playerCreator("X");
  const player2 = playerCreator("O");
  let winStatus = false;
  let tieStatus = false;
  let currentMarker = "";

  if (playAgainStatus === true) {
    if (event.target.tagName === "DIV") {
      row = event.target.getAttribute("data-row");
      column = event.target.getAttribute("data-column");

      if (
        event.target.textContent === "X" ||
        event.target.textContent === "O"
      ) {
        paraDisplay.textContent = "Oops, Tile Occupied! Click another tile";
      } else {
        if (player === "p1") {
          event.target.textContent = "X";
          currentMarker = player1.setMarker();
          gameBoard.insertMarker(player, row, column);
        } else if (player === "p2") {
          event.target.textContent = "O";
          currentMarker = player2.setMarker();
          gameBoard.insertMarker(player, row, column);
        }
        winStatus = gameBoard.winCheck(currentMarker, row, column);
        tieStatus = gameBoard.tieCheck(winStatus);
        player = gameBoard.switchTurn(player);
        if (player === "p1") {
          paraDisplay.textContent = "P1's turn, Click a tile to place 'X'";
        } else if (player === "p2") {
          paraDisplay.textContent = "P2's turn, Click a tile to place 'O'";
        }
      }
      if (tieStatus === true) {
        paraDisplay.textContent = "It's a Tie! Click any tile to play again!";
        playAgainStatus = false;
      } else if (winStatus === true) {
        playAgainStatus = false;
        if (currentMarker === "X") {
          paraDisplay.textContent =
            "P1(X) has won the Game! Click any tile to play again!";
        } else if (currentMarker === "O") {
          paraDisplay.textContent =
            "P2(O) has won the Game! Click any tile to play again!";
        }
      }
    }
  } else {
    playBtn.textContent = "Play again";
    paraDisplay.textContent = "";
    playBtn.style.marginTop = "-1rem";
    btnArea.appendChild(playBtn);
    gameBoardContainer.removeChild(gameBoardDiv);
  }
});
