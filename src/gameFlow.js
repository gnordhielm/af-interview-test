import { cloneDeep } from "lodash";
/*

game state is 

moves 
{
  rowIndex
  cellIndex
  playerValue
}

board
[
  [Number, Number, Number]
  [Number, Number, Number]
  [Number, Number, Number]
]

*/

export const EMPTY_CELL_VALUE = -1;
export const PLAYER_ONE_CELL_VALUE = 0;
export const PLAYER_TWO_CELL_VALUE = 1;

export const makeEmptyState = () => ({
  moves: [],
  board: [
    [EMPTY_CELL_VALUE, EMPTY_CELL_VALUE, EMPTY_CELL_VALUE],
    [EMPTY_CELL_VALUE, EMPTY_CELL_VALUE, EMPTY_CELL_VALUE],
    [EMPTY_CELL_VALUE, EMPTY_CELL_VALUE, EMPTY_CELL_VALUE]
  ]
});

export const getNextPlayerValue = gameState => {
  const { playerValue } = gameState.moves[gameState.moves.length - 1] || {};

  switch (playerValue) {
    case PLAYER_ONE_CELL_VALUE:
      return PLAYER_TWO_CELL_VALUE;
    case PLAYER_TWO_CELL_VALUE:
      return PLAYER_ONE_CELL_VALUE;
    default:
      return PLAYER_ONE_CELL_VALUE;
  }
};

export const processMove = ({
  lastGameState,
  rowIndex,
  cellIndex,
  playerValue
}) => {
  if (lastGameState.board[rowIndex][cellIndex] !== EMPTY_CELL_VALUE)
    throw new Error("cell is occupied");

  const winner = getGameWinner(lastGameState);
  if (winner !== undefined && winner !== EMPTY_CELL_VALUE)
    throw new Error("game already won");

  const nextState = cloneDeep(lastGameState);

  nextState.board[rowIndex][cellIndex] = playerValue;
  nextState.moves.push({
    rowIndex,
    cellIndex,
    playerValue
  });

  return nextState;
};

export const undoMove = lastGameState => {
  const lastMove = lastGameState.moves[lastGameState.moves.length - 1];

  if (!lastMove) return lastGameState;

  const nextState = cloneDeep(lastGameState);

  const { rowIndex, cellIndex } = lastMove;

  nextState.board[rowIndex][cellIndex] = EMPTY_CELL_VALUE;
  nextState.moves.pop();

  return nextState;
};

export const getLastMovePlayer = gameState => {
  const { playerValue } = gameState.moves[gameState.moves.length - 1] || {};

  switch (playerValue) {
    case PLAYER_ONE_CELL_VALUE:
      return PLAYER_TWO_CELL_VALUE;
    case PLAYER_TWO_CELL_VALUE:
      return PLAYER_ONE_CELL_VALUE;
    default:
      return EMPTY_CELL_VALUE;
  }
};

export const getIsCellEmpty = cellValue => cellValue === EMPTY_CELL_VALUE;

export const getPlayerDisplayValue = cellValue => {
  switch (cellValue) {
    case PLAYER_ONE_CELL_VALUE:
      return "X";
    case PLAYER_TWO_CELL_VALUE:
      return "O";
    default:
      return "";
  }
};

const getCommonValue = (values = []) => {
  const check = values[0];
  for (const value of values) if (value !== check) return;

  return check;
};

export const getGameWinner = gameState => {
  let winner;

  let nextRowToCheck = gameState.board.length - 1;
  while (nextRowToCheck >= 0) {
    winner = getCommonValue(gameState.board[nextRowToCheck]);
    if (winner !== undefined && winner !== EMPTY_CELL_VALUE) return winner;
    nextRowToCheck--;
  }

  let nextColumnToCheck = gameState.board[0].length - 1;
  while (nextColumnToCheck >= 0) {
    winner = getCommonValue(
      // eslint is concerned about scoping issues that don't show up here
      // eslint-disable-next-line no-loop-func
      gameState.board.reduce((all, row) => [...all, row[nextColumnToCheck]], [])
    );
    if (winner !== undefined && winner !== EMPTY_CELL_VALUE) return winner;
    nextColumnToCheck--;
  }

  winner = getCommonValue(
    gameState.board.reduce((all, row, index) => [...all, row[index]], [])
  );
  if (winner !== undefined && winner !== EMPTY_CELL_VALUE) return winner;

  winner = getCommonValue(
    gameState.board
      .slice()
      .reverse()
      .reduce((all, row, index) => [...all, row[index]], [])
  );
  if (winner !== undefined && winner !== EMPTY_CELL_VALUE) return winner;
};

export const getIsGameFull = gameState => {
  for (const row of gameState.board)
    for (const cell of row) if (cell === EMPTY_CELL_VALUE) return false;

  return true;
};
