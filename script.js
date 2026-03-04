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

  //For testing in the console
  const printBoard = () => {
    const boardWithSquareValues = board.map((row) =>
      row.map((col) => col.getValue()),
    );

    console.log(boardWithSquareValues);
  };

  return { getBoard, placeMarker, printBoard, resetBoard };
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
    return false;
  };

  //TODO: Add CheckforTie()

  const announceWinner = () => {
    console.log(`Player ${currentPlayer} wins!`);
  };

  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (index) => {
    const success = game.placeMarker(index, currentPlayer);
    if (!success) return;

    if (checkIfWin()) {
      announceWinner();
      game.resetBoard();
    } else {
      switchPlayerTurn();
    }

    game.printBoard();
  };

  return { playRound };
}

const game = GameController();
