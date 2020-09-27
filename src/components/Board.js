import React, { useEffect, useState } from "react";
import StyledBoardContainer, { StyledCell, StyledBoard } from "./styled/StyledBoardContainer";

const Board = () => {

  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [activeHovered, setActiveHovered] = useState(null);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    let board = [];
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        row.push(0);
      }
      board.push(row);
    }
    setBoard(board);
  };

  const toggleCurrentPlayer = () => {
    return currentPlayer === 1 ? setCurrentPlayer(2) : setCurrentPlayer(1);
  };

  const handleCellClick = (colIndex) => {
    return () => {
      if (winner) return;
      let clonedBoard = board.slice();
      for (let i = 5; i >= 0; i--) {
        if (!clonedBoard[i][colIndex]) {
          clonedBoard[i][colIndex] = currentPlayer;
          setBoard(clonedBoard);
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

  const checkWinner = (rowIndex, colIndex, board) => {
    return checkHorizontal(rowIndex, colIndex, board) ||
      checkVertical(rowIndex, colIndex, board) ||
      checkDiagonalRight(board) ||
      checkDiagonalLeft(board);
  };

  // const checkDiagonal = (rowIndex, colIndex, board) => {
  //   let rowStart = rowIndex;
  //   let colStart = colIndex;
  //   for (let i = 3; i >= 0; i--) {
  //     if (board[rowIndex - i] && board[rowIndex - i][colIndex - i]) {
  //       rowStart = rowIndex - i;
  //       colStart = colIndex - i;
  //       break;
  //     }
  //   }
  //   let winCount = 0;
  //   while(true) {
  //     if (!board[rowStart] || !board[rowStart][colStart]) {
  //       return false;
  //     }
  //     if (board[rowStart][colStart] === currentPlayer) {
  //       winCount++;
  //       if (winCount === 4) {
  //         alert("winner");
  //         return true;
  //       }
  //       rowStart++;
  //       colStart++;
  //     }
  //   }
  // };

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

  const checkVertical = (rowIndex, colIndex, board) => {
    let rowStart = 0;
    let rowEnd = 5;
    if (rowIndex + 4 <= 5) {
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

  const checkHorizontal = (rowIndex, colIndex, board) => {
    let colStart = 0;
    let colEnd = 6;
    if (colIndex + 4 < 6) {
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

  const handlePlayNewGame = () => {
    initializeBoard();
    setCurrentPlayer(1);
    setWinner(null);
  };

  return (
    <StyledBoardContainer>
      <div className="heading-container">
        <h1 className="heading">connect four</h1>
      </div>
      <StyledBoard currentPlayer={currentPlayer} activeHovered={activeHovered} winner={winner}>
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