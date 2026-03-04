// Create Function Gameboard
// Create variables rows = 3, columns = 3, board = []
// create a 2d array by creating an inner loop and an outer loop
// each outer loop should set board[i] = []
// each inner loop push a cell with a value

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

    const availableSquare = board[row][column].getValue() == null;

    if (!availableSquare) {
      console.log("square taken");
      return;
    }

    board[row][column].addMarker(player);
  };

  //For testing in the console
  const printBoard = () => {
    const boardWithSquareValues = board.map((row) =>
      row.map((col) => col.getValue()),
    );

    console.log(boardWithSquareValues);
  };

  return { getBoard, placeMarker, printBoard };
}

function Square() {
  let value = null;

  const addMarker = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    getValue,
    addMarker,
  };
}

function GameController() {
  const game = Gameboard();
  const board = game.getBoard();

  const players = ["X", "O"];
  let currentPlayer = players[0];

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

    const boardValues = board.flat().map((square) => square.getValue());

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
  };

  const announceWinner = () => {
    console.log(`Player ${currentPlayer} wins!`);
  };

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (index) => {
    game.placeMarker(index, currentPlayer);

    if (checkIfWin()) {
      announceWinner();
    } else {
      switchPlayerTurn();
    }

    game.printBoard();
  };

  return { playRound };
}

const game = GameController();
