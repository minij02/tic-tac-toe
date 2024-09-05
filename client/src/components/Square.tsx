import React from 'react';

interface SquareProps {
    value: 'X' | 'O' | null; // 각 칸에 표시될 값 (X, O, 또는 null)
    onClick: () => void; // 클릭 시 실행될 함수 (부모 컴포넌트에서 전달)
    highlight: boolean; // 승리한 칸을 하이라이트 처리하는 플래그
}

/**
 * Square 컴포넌트는 개별 틱택토 게임 칸을 렌더링하며,
 * 사용자가 클릭했을 때 부모 컴포넌트로부터 전달된 onClick 이벤트를 처리하고,
 * 승리한 칸인 경우 하이라이트를 적용
 *
 * @param value - 칸에 표시될 값 ('X', 'O', 또는 null)
 * @param onClick - 사용자가 칸을 클릭했을 때 실행될 함수
 * @param highlight - 해당 칸이 승리한 칸인 경우 true로 설정 (하이라이트 적용)
 */
function Square({ value, onClick, highlight }: SquareProps) {

    /**
     * 버튼을 렌더링하며, 'square' 클래스 외에도
     * highlight가 true인 경우 'highlight' 클래스를 추가하여 CSS에서 스타일을 적용.
     * 
     * @returns JSX.Element - 버튼 요소
     */
    return (
        <button className={`square ${highlight ? 'highlight' :  ''}`} onClick={onClick}>
            {value}  
        </button>
    );
}

export default Square;