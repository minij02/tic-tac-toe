import React from 'react';
import Square from './Square';

interface BoardProps {
    squares: ('X' | 'O' | null)[]; // 게임판의 상태를 나타내는 배열 (각 칸에 X, O 또는 null)
    previewSquares: ('X' | 'O' | null)[]; // 미리보기 상태
    onSquareClick: (i: number) => void; // 클릭 이벤트를 처리하는 함수
    winningSquares: number[] | null; // 승리한 칸의 인덱스를 저장한 배열 또는 null
}

/**
 * Board 컴포넌트는 틱택토 보드를 렌더링하며, 각 칸(Square)을 클릭할 때
 * 이벤트를 처리하고, 승리한 칸을 하이라이트하는 역할을 한다.
 * 
 * @param squares - 현재 게임판의 상태
 * @param previewSquares - 미리보기 상태
 * @param onSquareClick - 사용자가 특정 칸을 클릭했을 때 호출되는 함수
 * @param winningSquares - 승리한 칸들의 인덱스를 저장한 배열 (하이라이트 용도)
 */

function Board({ squares, previewSquares, onSquareClick, winningSquares }: BoardProps) {

    /**
     * renderSquare - 특정 인덱스(i)에 해당하는 Square 컴포넌트를 렌더링함.
     * 이때 미리보기가 있으면 미리보기 값을 우선적으로 표시.
     * 승리한 칸을 하이라이트하기 위해 해당 칸이 winningSquares 배열에 포함되어 있는지 확인.
     * 
     * @param i - Square의 인덱스
     * @returns JSX.Element - 개별 Square 컴포넌트
     */
    const renderSquare = (i: number) => {
      // 해당 Square가 승리한 칸인지 확인 (null인 경우 false로 처리)
      const isWinningSquare = winningSquares?.includes(i) ?? false;
      const isPreview = previewSquares[i] !== null; // 미리보기 여부 확인
      const value = isPreview ? previewSquares[i] : squares[i]; // 미리보기가 있으면 미리보기 표시
      return (
        <Square
          value={value} // 현재 칸의 값 (X, O, null)
          onClick={() => onSquareClick(i)} // 사용자가 클릭했을 때 호출되는 이벤트
          highlight={isWinningSquare}  // 하이라이트 여부 전달
          isPreview={isPreview} // 미리보기 상태 전달
        />
      );
    };
  
    /**
     * renderBoard - 3x3 보드를 렌더링하는 함수.
     * 이중 for문을 사용하여 각 행(row)와 열(col)을 생성하고, 각 칸을 renderSquare로 생성
     * 
     * @returns JSX.Element[] - 3x3 보드를 구성하는 JSX 배열
     */
    const renderBoard = () => {
      let board = []; // 전체 보드를 저장하는 배열

      for (let row = 0; row < 3; row++) {
        let boardRow = []; // 각 행에 해당하는 배열

        for (let col = 0; col < 3; col++) {
            // (row * 3 + col)을 통해  0~8까지의 인덱스를 계산하여 각 칸을 렌더링
          boardRow.push(renderSquare(row * 3 + col));
        }
        // boardRow 배열을 하나의 행으로 만들어 board에 추가
        board.push(<div key={row} className="board-row">{boardRow}</div>);
      }

      return board; // 최종적으로 렌더링할 보드 (3x3 구조)
    };
  
    // 최종적으로 보드 전체를 렌더링
    return <div>{renderBoard()}</div>;
  };  

export default Board;