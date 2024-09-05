import React, { useState } from 'react';
import Board from './Board';
import Timer from './Timer';
import useTimer from '../hooks/useTimer';
import calculateWinner from '../utils/calculateWinner';

function Game() {
    // 게임 상태 관리: 이력, 현재 차례, 정렬 상태
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [ascending, setAscending] = useState(true);
  
    const currentSquares = history[stepNumber]; // 현재 보드 상태
    const winner = calculateWinner(currentSquares); // 승자 계산

    /**
     * handleTimeUp - 시간이 다 되었을 때 자동으로 빈 칸 중 하나에 수를 둠.
     */
    const handleTimeUp = () => {
        // 빈 칸을 찾아서 자동으로 수를 둠
        const emptyIndex = currentSquares.findIndex((square) => square === null);
        if (emptyIndex !== -1 && !winner) {
            handleClick(emptyIndex); // 빈 칸에 수를 둠
            resetTimer(); // 시간이 다 되어 수를 둔 경우에도 타이머를 리셋
        }
    }
  
    // 타이머 설정: 각 플레이어에게 10초 제한 부여
    const { timeLeft, resetTimer } = useTimer(10, handleTimeUp);

    /**
     * handleClick - 지정된 인덱스(i)에 수를 둠.
     * @param {number} i - 클릭된 칸의 인덱스
     * @returns 
     */
    const handleClick = (i: number) => {
      const newHistory = history.slice(0, stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const squares = current.slice();
  
      // 이미 승자가 있거나 클릭된 칸이 채워져 있으면 동작하지 않음
      if (winner || squares[i]) {
        return;
      }
  
      // X 또는 O 수를 둠
      squares[i] = xIsNext ? 'X' : 'O';

      // 새로운 이력 업데이트 및 상태 관리
      setHistory(newHistory.concat([squares]));
      setStepNumber(newHistory.length);
      setXIsNext(!xIsNext); 
      resetTimer(); // 새로운 턴이 시작되면 타이머 리셋
    };
  
    /**
     * jumpTo - 특정 이동 단계로 되돌아감.
     * @param {number} step - 되돌아갈 단계
     */
    const jumpTo = (step: number) => {
      setStepNumber(step);
      setXIsNext(step % 2 === 0);
      resetTimer(); // 이동 시 타이머도 리셋
    };
  
    /**
     * renderMoves - 게임의 이동 기록을 렌더링함.
     * 이동 기록은 오름차순 또는 내림차순으로 정렬됨.
     */
    const renderMoves = () => {
      const moves = history.map((_, move) => {
        const desc = move
          ? `Go to move #${move} (${Math.floor((move - 1) / 3)}, ${(move - 1) % 3})`
          : 'Go to game start';
  
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      return ascending ? moves : moves.reverse();  // 정렬된 이동 기록 반환
    };
  
    /**
     * 무승부 상태 계산 - 모든 칸이 채워졌는지 확인하여 무승부 처리
     */
    const isDraw = () => {
        return currentSquares.every(square => square !== null) && !winner;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentSquares} onSquareClick={handleClick} winningSquares={winner ? winner.winningSquares : []}/> 
        </div>
        <div className="game-info">
          <div>{winner ? `Winner: ${winner.winner}` : isDraw() ? 'Draw!' : `Next player: ${xIsNext ? 'X' : 'O'}`}</div>
         
          {!winner && !isDraw() && <Timer timeLeft={timeLeft} />}
          
          <button onClick={() => setAscending(!ascending)}>
            Sort by: {ascending ? 'Ascending' : 'Descending'}
          </button>
          <ol>{renderMoves()}</ol>
        </div>
      </div>
    );
  };  

export default Game;