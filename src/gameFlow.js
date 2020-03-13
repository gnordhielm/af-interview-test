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
  [0/1/null, 0/1/null, 0/1/null]
  [0/1/null, 0/1/null, 0/1/null]
  [0/1/null, 0/1/null, 0/1/null]
]

*/

export const EMPTY_CELL_VALUE = null;
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
  const nextState = cloneDeep(lastGameState);

  if (lastGameState.board[rowIndex][cellIndex] !== EMPTY_CELL_VALUE)
    throw new Error("cell is occupied");

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

export const getCellDisplayValue = cellValue => {
  switch (cellValue) {
    case PLAYER_ONE_CELL_VALUE:
      return "X";
    case PLAYER_TWO_CELL_VALUE:
      return "O";
    default:
      return "";
  }
};
