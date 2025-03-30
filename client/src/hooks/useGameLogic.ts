import { useState } from 'react';
import calculateWinner from '../utils/calculateWinner';

interface GameLogicProps {
  playerType: string | null;
  gameTime: number | null;
  resetTimer: () => void;
}

/**
 * useGameLogic - 게임의 상태와 관련된 모든 로직을 관리하는 커스텀 훅
 */
function useGameLogic({ playerType, gameTime, resetTimer }: GameLogicProps) {
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
   * 사람이 수를 두는 함수
   * handleClick - 지정된 인덱스(i)에 첫 번째 클릭 시 미리보기로 표시, 두 번째 클릭 시 실제로 수를 둠.
   * @param {number} i - 클릭된 칸의 인덱스
   * @returns 
   */
  const handleClick = (i: number) => {
    // 게임이 종료되었거나 컴퓨터의 차례인 경우 더 이상 수를 두지 않음
    if (winner || stepNumber >= 9 || (playerType === 'computer' && !xIsNext)) {
      return;
    }

    const squaresCopy = [...currentSquares];

    // 이미 승자가 있거나 해당 칸이 차있으면 무시 (미리보기는 무시하지 않음)
    if (squaresCopy[i]) {
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
   * renderMoves용 데이터 생성 - 이동 기록 설명 리스트를 반환
   */
   const moveList = history.map((_, move) => {
    const desc = move
      ? `Go to move #${move} (${Math.floor((move - 1) / 3)}, ${(move - 1) % 3})`
      : 'Go to game start';
    return { move, desc };
  });

  /**
   * 무승부 상태 계산 - 모든 칸이 채워졌는지 확인하여 무승부 처리
   */
  const isDraw = () => {
    return currentSquares.every(square => square !== null) && !winner;
  };

  return {
    history,
    setHistory,
    stepNumber,
    setStepNumber,
    xIsNext,
    setXIsNext,
    previewSquares,
    previewIndex,
    setPreviewSquares,
    setPreviewIndex,
    ascending,
    setAscending,
    winner,
    currentSquares,
    handleClick,
    moveList,
    isDraw,
    jumpTo,
  };
}

export default useGameLogic;
