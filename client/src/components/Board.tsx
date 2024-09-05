import React from 'react';
import Square from './Square';

interface BoardProps {
    squares: ('X' | 'O' | null)[];
    onSquareClick: (i: number) => void;
    winningSquares: number[] | null;
}

const Board: React.FC<BoardProps> = ({ squares, onSquareClick, winningSquares }) => {
    const renderSquare = (i: number) => {
      // null인 경우 false로 변환
      const isWinningSquare = winningSquares?.includes(i) ?? false;
      return (
        <Square
          value={squares[i]}
          onClick={() => onSquareClick(i)}
          highlight={isWinningSquare}  // 하이라이트 여부 전달
        />
      );
    };
  
    const renderBoard = () => {
      let board = [];
      for (let row = 0; row < 3; row++) {
        let boardRow = [];
        for (let col = 0; col < 3; col++) {
          boardRow.push(renderSquare(row * 3 + col));
        }
        board.push(<div key={row} className="board-row">{boardRow}</div>);
      }
      return board;
    };
  
    return <div>{renderBoard()}</div>;
  };  

export default Board;