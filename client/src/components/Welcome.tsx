import React from 'react';
import './Welcome.css';

interface WelcomeProps {
  onStart: () => void; // onStart는 'Start' 버튼 클릭 시 호출되는 함수
}

/**
 * Welcome 컴포넌트
 * Tic-Tac-Toe 게임의 시작 화면을 표시하는 컴포넌트.
 * 'Start' 버튼을 눌러 게임을 시작할 수 있다.
 */
function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="welcome">
      {/* 게임 타이틀을 화면에 표시 */}
      <h1>Welcome to Tic-Tac-Toe!</h1>
      <div className="button-container">
         {/* 'Start' 버튼: 클릭하면 onStart 함수 호출 */}
      <button onClick={onStart} className="start-btn">
        Start
      </button>
      </div>
    </div>
  );
}

export default Welcome;
