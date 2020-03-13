import React from "react";
import "./App.css";
import {
  makeEmptyState,
  processMove,
  getNextPlayerValue,
  getPlayerDisplayValue,
  getLastMovePlayer,
  undoMove,
  getGameWinner,
  getIsGameFull,
  EMPTY_CELL_VALUE
} from "../gameFlow";
import Board from "./Board";

const App = () => {
  const [gameState, setGameState] = React.useState(() => makeEmptyState());

  const handleResetGame = () => {
    setGameState(makeEmptyState());
  };

  const handleUndo = () => {
    setGameState(last => undoMove(last));
  };

  const nextPlayerValue = getNextPlayerValue(gameState);
  const isGameFull = getIsGameFull(gameState);
  const gameWinner = getGameWinner(gameState);

  const handleCellClick = ({ rowIndex, cellIndex }) => {
    setGameState(last => {
      try {
        return processMove({
          lastGameState: last,
          rowIndex,
          cellIndex,
          playerValue: nextPlayerValue
        });
      } catch (error) {
        return last;
      }
    });
  };

  const instructionsMessage = React.useMemo(() => {
    if (gameWinner !== undefined && gameWinner !== EMPTY_CELL_VALUE)
      return <>{getPlayerDisplayValue(gameWinner)} wins!</>;
    if (isGameFull) return <>Tie!</>;

    return <>{getPlayerDisplayValue(nextPlayerValue)} goes next.</>;
  }, [nextPlayerValue, isGameFull, gameWinner]);

  return (
    <div className="App">
      <h1 className="__header">Tic-tac-toe</h1>
      <div className="__instructions">{instructionsMessage}</div>
      <div className="__board">
        <Board board={gameState.board} onCellClick={handleCellClick} />
      </div>
      <div className="__controls">
        <button onClick={handleUndo} disabled={!gameState.moves.length}>
          Undo move by{" "}
          {getPlayerDisplayValue(getLastMovePlayer(gameState)) || "-"}
        </button>
        <button onClick={handleResetGame}>New game</button>
      </div>
    </div>
  );
};

export default App;
