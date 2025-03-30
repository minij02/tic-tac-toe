import { useEffect } from 'react';
import { calculateBestMove } from '../utils/calculateBestMove';

interface Props {
  xIsNext: boolean;
  playerType: string | null;
  winner: any;
  stepNumber: number;
  history: any[];
  gameTime: number | null;
  currentSquares: any[];
  setHistory: (h: any[]) => void;
  setStepNumber: (n: number) => void;
  setXIsNext: (v: boolean) => void;
  resetTimer: () => void;
}

/**
 * useComputerMove - 컴퓨터의 차례가 되었을 때 최적의 수를 자동으로 두는 로직을 포함한 커스텀 훅
 *
 * 조건:
 * - 게임이 아직 끝나지 않았고
 * - 현재 턴이 컴퓨터이며
 * - 마지막 수 이후 새로운 수가 놓이지 않은 상태일 때 작동
 *
 * 기능:
 * - 일정 시간 지연 후 (랜덤 딜레이) 컴퓨터가 자동으로 최적의 수를 둔다
 */
export default function useComputerMove({
  xIsNext,
  playerType,
  winner,
  stepNumber,
  history,
  gameTime,
  currentSquares,
  setHistory,
  setStepNumber,
  setXIsNext,
  resetTimer,
}: Props) {
  useEffect(() => {
    // 게임이 끝났으면 아무 것도 하지 않음 (게임 종료 시)
    if (stepNumber >= 9 || winner) {
      return;
    }
    // 조건: 컴퓨터 차례 + 승자 없음 + 이전에 이 step에서 자동 수를 안 둔 경우
    if (!xIsNext && playerType === 'computer' && !winner) {
      const randomDelay = Math.random() * (gameTime || 10) * 1000; // gameTime 내에서 랜덤 시간 (ms 단위)
      const bestMove = calculateBestMove(currentSquares); // 컴퓨터의 최적 수 계산
      // bestMove 자리에 이미 수가 있으면 자동 수 생략 (이미 실행된 상태로 간주)
      if (currentSquares[bestMove]) return;
      const timeoutId = setTimeout(() => {
        const squaresCopy = [...currentSquares];
        squaresCopy[bestMove] = 'O'; // 컴퓨터는 항상 O

        // 기록을 덮어씌우지 않고 stepNumber까지 자르고, 그 다음 새로운 기록을 추가
        setHistory([...history.slice(0, stepNumber + 1), squaresCopy]);
        setStepNumber(stepNumber + 1);
        setXIsNext(true); // 다시 사람 차례로 넘김
        resetTimer(); // 컴퓨터가 수를 둔 후 타이머 리셋
      }, randomDelay);

      return () => clearTimeout(timeoutId);
    }
  }, [xIsNext, playerType, currentSquares, winner, gameTime, history.length, stepNumber]);
}