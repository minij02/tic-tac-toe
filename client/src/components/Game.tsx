import Board from './Board';
import Timer from './Timer';
import useTimer from '../hooks/useTimer';
import useGameLogic from '../hooks/useGameLogic';
import useComputerMove from '../hooks/useComputerMove';

interface GameProps {
  playerType: string | null; // vs Person or vs Computer
  gameTime: number | null;   // 게임 시간 설정 (10s, 30s, 60s)
}

function Game({ playerType, gameTime }: GameProps) {
  // 타이머 설정: 각 플레이어에게 시간 제한 부여
  const { timeLeft, resetTimer } = useTimer(gameTime || 10, handleTimeUp);

  // 게임 상태 및 이벤트 로직을 훅에서 가져옴
  const {
    history,
    setHistory,
    stepNumber,
    setStepNumber,
    xIsNext,
    setXIsNext,
    previewSquares,
    setPreviewSquares,
    previewIndex,
    setPreviewIndex,
    currentSquares,
    winner,
    ascending,
    setAscending,
    isDraw,
    jumpTo,
    handleClick,
    moveList,
  } = useGameLogic({ playerType, gameTime, resetTimer });

  /**
   * handleTimeUp - 시간이 다 되었을 때 턴을 넘김.
   */
  function handleTimeUp() {
    if (!winner) {
      setXIsNext(!xIsNext);
      setPreviewIndex(null);
      setPreviewSquares(Array(9).fill(null)); // 미리보기 초기화
      resetTimer(); // 타이머 리셋
    }
  }

  // 컴퓨터의 차례인 경우 최적의 수를 두는 로직 추가
  useComputerMove({
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
  });

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
        <ol>
          {(ascending ? moveList : [...moveList].reverse()).map(({ move, desc }) => (
            <li key={move}>
              <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Game;