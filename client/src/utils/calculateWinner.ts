/**
 * calculateWinner - 주어진 게임판에서 승리자를 계산하는 함수.
 * 
 * @param squares - 각 칸에 'X', 'O', 또는 null이 들어있는 배열 (게임 보드 상태)
 * @returns { winner: 'X' | 'O', winningSquares: number[] } | null
 *   - 승자가 있으면 승리자와 승리한 칸의 인덱스를 반환하고,
 *   - 승자가 없으면 null을 반환.
 */
const calculateWinner = (squares: ('X' | 'O' | null)[]) => {
    // 승리 가능한 모든 라인의 인덱스를 정의한 배열
    const lines = [
        [0, 1, 2],  // 첫 번째 행
        [3, 4, 5],  // 두 번째 행
        [6, 7, 8],  // 세 번째 행
        [0, 3, 6],  // 첫 번째 열
        [1, 4, 7],  // 두 번째 열
        [2, 5, 8],  // 세 번째 열
        [0, 4, 8],  // 대각선 (왼쪽 위에서 오른쪽 아래)
        [2, 4, 6],  // 대각선 (오른쪽 위에서 왼쪽 아래)
    ];

     // 각 승리 라인에 대해 승자가 있는지 확인
    for (let i = 0; i < lines.length; i++) {
        const  [a, b, c] = lines[i]; // 한 줄에 해당하는 세 개의 인덱스를 가져옴

        // 세 개의 칸이 모두 같은 값('X' 또는 'O')이고 null이 아닐 때 승자 결정
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { 
                winner: squares[a], // 승리한 플레이어 ('X' 또는 'O')
                winningSquares:[a, b, c] // 승리한 칸들의 인덱스
            };
        }
    }
    
    // 승자가 없으면 null 반환
    return null;
}

export default calculateWinner;