import React from "react";
import "./Board.css";
import { getIsCellEmpty, getCellDisplayValue } from "../gameFlow";

const Board = ({ board, onCellClick }) => {
  return (
    <div className="Board">
      {board.map((row, rowIndex) => (
        <div className="__row" key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <div
              className={
                "__cell" + (getIsCellEmpty(cell) ? " --empty" : " --filled")
              }
              key={cellIndex}
              onClick={() => {
                onCellClick({ rowIndex, cellIndex, cell });
              }}
            >
              {getCellDisplayValue(cell)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
