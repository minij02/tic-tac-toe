import calculateWinner from './calculateWinner';

/**
 * Minimax 알고리즘을 사용하여 컴퓨터의 최적 수를 계산
 * @param {('X' | 'O' | null)[]} board 현재 보드 상태
 * @param {boolean} isMaximizing 컴퓨터의 차례면 true, 아니면 false
 * @returns {number} 최적의 위치 인덱스
 */
function minimax(board: ('X' | 'O' | null)[], depth: number, isMaximizing: boolean): number {
  const winner = calculateWinner(board);
  if (winner) {
    if (winner.winner === 'O') return 10 - depth; // 컴퓨터 승리
    if (winner.winner === 'X') return depth - 10; // 사람 승리
    return 0; // 무승부
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) { // 빈 칸에 대해 가능한 수를 둠
        board[i] = 'O';
        const score = minimax(board, depth + 1, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = null;
        if (score < bestScore) {
          bestScore = score;
        }
      }
    }
    return bestScore;
  }
}

/**
 * 현재 보드 상태에서 컴퓨터의 최적 수를 반환
 * @param {('X' | 'O' | null)[]} board 현재 보드 상태
 * @returns {number} 최적의 수의 인덱스
 */
export function calculateBestMove(board: ('X' | 'O' | null)[]): number {
  return minimax(board, 0, true);
}
