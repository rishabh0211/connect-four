import React, { useEffect, useState } from "react";
import StyledBoardContainer, { StyledCell, StyledBoard } from "./styled/StyledBoardContainer";

const Board = () => {

  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [activeHovered, setActiveHovered] = useState(null);
  const [width, setWidth] = useState(null);
  const [lastCord, setLastCord] = useState([]);
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(7);

  useEffect(() => {
    initializeBoard();
    calculateWidth();
  }, []);

  const initializeBoard = () => {
    let board = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push(0);
      }
      board.push(row);
    }
    setBoard(board);
  };

  const handleGridChange = () => {
    // setCurrentPlayer(1);
    initializeBoard();
  };

  /**
   * calculates and sets the width of the board
   */
  const calculateWidth = () => {
    let width = window.innerWidth / 10;
    if (width > 70) {
      width = 70;
    }
    setWidth(width);
  };

  /**
   * toggle the current player
   */
  const toggleCurrentPlayer = () => {
    return currentPlayer === 1 ? setCurrentPlayer(2) : setCurrentPlayer(1);
  };

  /**
   * Handles the click event on the cell
   */
  const handleCellClick = (colIndex) => {
    return () => {
      if (winner) return;
      let clonedBoard = board.slice();
      for (let i = rows-1; i >= 0; i--) {
        if (!clonedBoard[i][colIndex]) {
          clonedBoard[i][colIndex] = currentPlayer;
          setBoard(clonedBoard);
          setLastCord([i, colIndex]);
          let isWinner = checkWinner(i, colIndex, clonedBoard);
          if (isWinner) {
            setWinner(currentPlayer);
          } else {
            toggleCurrentPlayer();
          }
          return;
        }
      }
    };
  };

  /**
   * Checks if there is any winner in the current board state
   */
  const checkWinner = (rowIndex, colIndex, board) => {
    return checkHorizontal(rowIndex, colIndex, board) ||
      checkVertical(rowIndex, colIndex, board) ||
      checkDiagonalRight(board) ||
      checkDiagonalLeft(board);
  };

  /**
   * Checks fot the winner in the right diagonal
   */
  const checkDiagonalRight = (board) => {
    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i - 1][j + 1] &&
            board[i][j] === board[i - 2][j + 2] &&
            board[i][j] === board[i - 3][j + 3]) {
            return true;
          }
        }
      }
    }
    return false;
  };

  /**
   * Checks fot the winner in the right diagonal
   */
  const checkDiagonalLeft = (board) => {
    for (let i = 3; i < 6; i++) {
      for (let j = 3; j < 7; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i - 1][j - 1] &&
            board[i][j] === board[i - 2][j - 2] &&
            board[i][j] === board[i - 3][j - 3]) {
            return true;
          }
        }
      }
    }
    return false;
  };

  /**
   * Checks fot the winner in vertically
   */
  const checkVertical = (rowIndex, colIndex, board) => {
    let rowStart = 0;
    let rowEnd = rows - 1;
    if (rowIndex + 4 <= rows - 1) {
      rowEnd = rowIndex + 3;
    }
    if (rowIndex - 4 >= 0) {
      rowStart = rowIndex - 3;
    }
    let winCount = 0;
    for (let i = rowStart; i <= rowEnd; i++) {
      if (board[i][colIndex] === currentPlayer) {
        winCount++;
        if (winCount === 4) {
          return true;
        }
      } else {
        winCount = 0;
      }
    }
    return false;
  };

  /**
   * Checks fot the winner in horizontallly
   */
  const checkHorizontal = (rowIndex, colIndex, board) => {
    let colStart = 0;
    let colEnd = cols - 1;
    if (colIndex + 4 < cols - 1) {
      colEnd = colIndex + 3;
    }
    if (colIndex - 4 > 0) {
      colStart = colIndex - 3;
    }
    let winCount = 0;
    for (let i = colStart; i <= colEnd; i++) {
      if (board[rowIndex][i] === currentPlayer) {
        winCount++;
        if (winCount === 4) {
          return true;
        }
      } else {
        winCount = 0;
      }
    }
    return false;
  };

  /**
   * Handles the click on the new game cta
   */
  const handlePlayNewGame = () => {
    initializeBoard();
    setCurrentPlayer(1);
    setWinner(null);
  };

  const handleUndoClick = () => {
    const [row, column] = lastCord;
    let clonedBoard = board.slice();
    clonedBoard[row][column] = 0;
    setLastCord([]);
    if (!winner) {
      toggleCurrentPlayer();
    }
    setWinner(null);
  };

  return (
    <StyledBoardContainer>
      <div className="heading-container">
        <h1 className="heading">connect four</h1>
      </div>
      <input
        type="number"
        value={rows}
        onChange={e => setRows(+e.target.value)}
      />
      <input
        type="number"
        value={cols}
        onChange={e => setCols(+e.target.value)}
      />
      <button className="btn" onClick={handleGridChange}>submit</button>
      <StyledBoard
        currentPlayer={currentPlayer}
        activeHovered={activeHovered}
        winner={winner}
        width={width}
        rows={rows}
        cols={cols}
      >
        {
          board.map((row, rowIndex) => {
            return row.map((col, colIndex) => (
              <StyledCell
                className={`cell ${board[rowIndex][colIndex] === 1 ? "active-1" : board[rowIndex][colIndex] === 2 ? "active-2" : ""}`}
                onClick={handleCellClick(colIndex)}
                key={rowIndex + colIndex}
                onMouseOver={() => setActiveHovered(colIndex)}
                rowIndex={rowIndex}
              />
            ))
          })}

      </StyledBoard>
      {lastCord && !!lastCord.length &&
        <button
          className="btn undo-btn"
          onClick={handleUndoClick}
        >
          Undo
        </button>
      }
      <div className="bottom-container">
        <div className="legend">
          <div className="legend-attr legend-red">Player 1</div>
          <div className="legend-attr legend-yellow">Player 2</div>
        </div>
        {winner &&
          <div className="btn-container">
            <h3 className="win-msg">Player {winner} is the winner!</h3>
            <button className="btn" onClick={handlePlayNewGame}>New Game</button>
          </div>
        }
      </div>
    </StyledBoardContainer>
  )
}

export default Board;