function calculateAIMove(squares: ('X' | 'O' | null)[], xIsNext: boolean) {
    // 가능한 빈 칸들을 찾는다.
    const availableMoves = squares.map((square, index) => (square === null ? index: null)).filter(index  => index !== null);

    // 무작위로 빈 칸을 선택한다.
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    return randomMove;
}

export default calculateAIMove;