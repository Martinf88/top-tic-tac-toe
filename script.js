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
  let currentPlayer = "X";

  const playRound = (index) => {
    game.placeMarker(index, currentPlayer);

    game.printBoard();
  };

  return { playRound };
}

const game = GameController();
