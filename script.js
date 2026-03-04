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
  console.log(board);

  return { getBoard };
}

function Square() {
  let value = null;

  const getValue = () => value;

  return {
    getValue,
  };
}

Gameboard();
