function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  const getBoard = () => board;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Square());
    }
  }

  const placeMarker = (index, player) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    console.log(row);
    console.log(column);

    const success = board[row][column].addMarker(player);

    if (!success) {
      console.log("Square taken!");
      return false;
    }
    return true;
  };

  const resetBoard = () => {
    for (const row of board) {
      for (const square of row) {
        square.resetValue();
      }
    }
  };

  const getBoardValues = () => {
    return board.flat().map((square) => square.getValue());
  };

  //For testing in the console
  const printBoard = () => {
    const boardWithSquareValues = board.map((row) =>
      row.map((col) => col.getValue()),
    );

    console.log(boardWithSquareValues);
  };

  return { getBoard, placeMarker, printBoard, resetBoard, getBoardValues };
}

function Square() {
  let value = null;

  const addMarker = (player) => {
    if (value !== null) return false;
    value = player;
    return true;
  };

  const getValue = () => value;

  const resetValue = () => {
    value = null;
  };

  return {
    getValue,
    addMarker,
    resetValue,
  };
}

function GameController() {
  const game = Gameboard();

  let gameOver = false;

  const players = ["X", "O"];
  let currentPlayer = players[0];
  let winner = "";

  const getActivePlayer = () => currentPlayer;
  const getWinner = () => winner;
  const getGameState = () => gameOver;

  const checkIfWin = () => {
    const winningLines = [
      //Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      //Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    const boardValues = game.getBoardValues();

    for (const line of winningLines) {
      const [a, b, c] = line;

      if (
        boardValues[a] === boardValues[b] &&
        boardValues[b] === boardValues[c] &&
        boardValues[a] !== null
      ) {
        return true;
      }
    }
    return false;
  };

  const checkForTie = () => {
    const boardValues = game.getBoardValues();
    return boardValues.every((value) => value !== null);
  };

  const announceWinner = () => {
    winner = `Player ${currentPlayer} Wins!`;
  };

  const announceTie = () => {
    winner = "Draw!";
  };

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (index) => {
    if (gameOver) return;

    const success = game.placeMarker(index, currentPlayer);
    if (!success) return;

    if (checkIfWin()) {
      announceWinner();
      gameOver = true;
    } else if (checkForTie()) {
      announceTie();
      gameOver = true;
    } else {
      switchPlayerTurn();
    }

    game.printBoard();
  };

  const startNewGame = () => {
    game.resetBoard();
    currentPlayer = players[0];
    gameOver = false;
  };

  return {
    playRound,
    startNewGame,
    getBoard: game.getBoard,
    getActivePlayer,
    getWinner,
    getGameState,
  };
}

function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");
  const newGameButton = document.querySelector(".new-game");

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    if (game.getGameState()) {
      const winner = game.getWinner();
      playerTurnDiv.textContent = winner;
    } else {
      playerTurnDiv.textContent = `Player ${activePlayer}'s turn.`;
    }

    board.forEach((row, rowIndex) => {
      row.forEach((square, colIndex) => {
        const squareButton = document.createElement("button");
        squareButton.classList.add("square");

        const index = rowIndex * 3 + colIndex;
        squareButton.dataset.index = index;

        squareButton.textContent = square.getValue();
        if (squareButton.textContent === "O") {
          squareButton.classList.add("marker-o");
        } else {
          squareButton.classList.add("marker-x");
        }

        boardDiv.appendChild(squareButton);
      });
    });
  };

  boardDiv.addEventListener("click", (e) => {
    const clickedSquare = e.target;

    if (!clickedSquare.classList.contains("square")) return;

    const index = Number(clickedSquare.dataset.index);

    game.playRound(index);
    updateScreen();
  });

  newGameButton.addEventListener("click", () => {
    game.startNewGame();
    updateScreen();
  });

  // Initial render
  updateScreen();
}

ScreenController();
