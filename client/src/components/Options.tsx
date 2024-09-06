import React, { useState } from 'react';
import './Options.css'
interface OptionsProps {
  // onConfirm은 선택한 플레이어 유형과 게임 시간을 전달하여 게임을 시작하는 함수
  onConfirm: (playerType: string, gameTime: number) => void;
}

/**
 * Options 컴포넌트
 * 플레이어가 게임 상대와 시간을 선택할 수 있는 옵션 화면을 구성.
 * 'Start Game' 버튼을 눌러 선택한 옵션을 부모 컴포넌트로 전달.
 */
function Options({ onConfirm }: OptionsProps) {
  // 플레이어 유형 (vs Person 또는 vs Computer) 선택 상태 관리
  const [playerType, setPlayerType] = useState<string | null>(null);

  // 게임 시간 (10초, 30초, 60초) 선택 상태 관리
  const [gameTime, setGameTime] = useState<number | null>(null);

  // 플레이어 유형과 게임 시간이 모두 선택되었는지 확인하는 변수
  const isSelectionComplete = playerType !== null && gameTime !== null;

  return (
    <div className="options">
      {/* 화면 상단에 옵션 타이틀 표시 */}
      <h1>Options</h1>
      
      {/* 플레이어 유형 선택 섹션 */}
      <div className="option-group">
        <h2>Choose Opponent:</h2>
        {/* vs Person 선택 버튼 */}
        <button 
          onClick={() => setPlayerType('person')} 
          className={playerType === 'person' ? 'selected' : ''}
        >
          vs. Person
        </button>

        {/* vs Computer 선택 버튼 */}
        <button 
          onClick={() => setPlayerType('computer')} 
          className={playerType === 'computer' ? 'selected' : ''}
        >
          vs. Computer
        </button>
      </div>

      {/* 게임 시간 선택 섹션 */}
      <div className="option-group">
        <h2>Set Time:</h2>

        {/* 10초 선택 버튼 */}
        <button 
          onClick={() => setGameTime(10)} 
          className={gameTime === 10 ? 'selected' : ''}
        >
          10s
        </button>

        {/* 30초 선택 버튼 */}
        <button 
          onClick={() => setGameTime(30)} 
          className={gameTime === 30 ? 'selected' : ''}
        >
          30s
        </button>

        {/* 60초 선택 버튼 */}
        <button 
          onClick={() => setGameTime(60)} 
          className={gameTime === 60 ? 'selected' : ''}
        >
          60s
        </button>
      </div>

      {/* Start Game 버튼: 플레이어 유형과 시간이 모두 선택되었을 때만 활성화 */}
      <button
        onClick={() => isSelectionComplete && onConfirm(playerType!, gameTime!)}
        disabled={!isSelectionComplete} // 선택이 완료되지 않으면 버튼 비활성화
        className="start-game-btn"
      >
        Start Game
      </button>
    </div>
  );
}

export default Options;
