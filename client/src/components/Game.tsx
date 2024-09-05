import React, { useState, useEffect } from 'react';
import Board from './Board';
import Timer from './Timer';
import useTimer from '../hooks/useTimer';
import calculateWinner from '../utils/calculateWinner';
import { calculateBestMove } from '../utils/calculateBestMove'
interface GameProps {
    playerType: string | null; // vs Person or vs Computer
    gameTime: number | null;   // 게임 시간 설정 (10s, 30s, 60s)
  }

function Game({ playerType, gameTime }: GameProps) {
    // 게임 상태 관리: 이력, 현재 차례, 정렬 상태
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [previewSquares, setPreviewSquares] = useState(Array(9).fill(null)); // 미리보기 상태 추가
    const [previewIndex, setPreviewIndex] = useState<number | null>(null); // 미리보기가 적용된 칸의 인덱스
    const [ascending, setAscending] = useState(true);
  
    const currentSquares = history[stepNumber]; // 현재 보드 상태
    const winner = calculateWinner(currentSquares); // 승자 계산

    /**
     * handleTimeUp - 시간이 다 되었을 때 턴을 넘김.
     */
    const handleTimeUp = () => {
        // 시간이 다 되었을 때, 다음 플레이어로 턴을 넘김
        if (!winner) {
            setXIsNext(!xIsNext);
            setPreviewIndex(null);
            setPreviewSquares(Array(9).fill(null)); // 미리보기 초기화
            resetTimer(); // 타이머 리셋
        }
    }
  
    // 타이머 설정: 각 플레이어에게 10초 제한 부여
    const { timeLeft, resetTimer } = useTimer(gameTime || 10, handleTimeUp);

     // 컴퓨터의 차례인 경우 최적의 수를 두는 로직 추가
    useEffect(() => {
      if (!xIsNext && playerType === 'computer' && !winner) {
        const randomDelay = Math.random() * (gameTime || 10) * 1000; // gameTime 내에서 랜덤 시간 (ms 단위)
        const bestMove = calculateBestMove(currentSquares); // 컴퓨터의 최적 수 계산
        
        // 랜덤한 시간에 컴퓨터가 수를 두도록 setTimeout 사용
      const timeoutId = setTimeout(() => {
        makeComputerMove(bestMove);  // 컴퓨터가 최적의 수를 둠
      }, randomDelay);

      return () => clearTimeout(timeoutId); // cleanup 함수로 타이머를 제거
    }
  }, [xIsNext, playerType, currentSquares, winner, gameTime]);

  /**
   * 컴퓨터가 최적의 수를 두는 함수
   * @param {number} i - 컴퓨터가 두어야 할 인덱스
   */
  const makeComputerMove = (i: number) => {
    const squaresCopy = [...currentSquares];

    squaresCopy[i] = 'O'; // 컴퓨터는 항상 O
    setHistory([...history.slice(0, stepNumber + 1), squaresCopy]);
    setStepNumber(stepNumber + 1);
    setXIsNext(true); // 다시 사람 차례로 넘김
    resetTimer(); // 컴퓨터가 수를 둔 후 타이머 리셋
  };

    /**
     * 사람이 수를 두는 함수
     * handleClick - 지정된 인덱스(i)에 첫 번째 클릭 시 미리보기로 표시, 두 번째 클릭 시 실제로 수를 둠.
     * @param {number} i - 클릭된 칸의 인덱스
     * @returns 
     */
    const handleClick = (i: number) => {
        const squaresCopy = [...currentSquares];

        // 이미 승자가 있거나 해당 칸이 차있으면 무시 (미리보기는 무시하지 않음)
        if (winner || squaresCopy[i]) {
            return;
        }

        if (previewIndex === i) {
            // 미리보기를 두 번째로 클릭하면 실제로 수를 둠
            squaresCopy[i] = xIsNext ? 'X' : 'O';
            setHistory([...history.slice(0, stepNumber + 1), squaresCopy]);
            setStepNumber(stepNumber + 1);
            setXIsNext(!xIsNext);
            setPreviewIndex(null);
            setPreviewSquares(Array(9).fill(null)); // 미리보기 초기화
            resetTimer(); // 턴을 넘기면서 타이머 리셋
        } else {
            // 첫 번째 클릭 시 미리보기로 수를 표시
            const previewCopy = [...Array(9).fill(null)];
            previewCopy[i] = xIsNext ? 'X' : 'O';
            setPreviewIndex(i);
            setPreviewSquares(previewCopy);
        }
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
            <Board
                squares={currentSquares}
                onSquareClick={handleClick}
                previewSquares={previewSquares} // 미리보기 상태 전달
                winningSquares={winner ? winner.winningSquares : []}
            />
        </div>
        <div className="game-info">
            <div>
                {winner
                    ? `Winner: ${winner.winner}`
                    : isDraw()
                    ? 'Draw!'
                    : `Next player: ${xIsNext ? 'X' : 'O'}`}
            </div>

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