import React from "react";
import "./App.css";
import {
  makeEmptyState,
  processMove,
  getNextPlayerValue,
  getCellDisplayValue,
  getLastMovePlayer,
  undoMove
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
        console.error("illegal move", error);
        return last;
      }
    });
  };

  const instructionsMessage = React.useMemo(() => {
    return <>{getCellDisplayValue(nextPlayerValue)} goes next.</>;
  }, [gameState]);

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
          {getCellDisplayValue(getLastMovePlayer(gameState)) || "-"}
        </button>
        <button onClick={handleResetGame}>New game</button>
      </div>
    </div>
  );
};

export default App;
