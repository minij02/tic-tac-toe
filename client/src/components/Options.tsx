import React, { useState } from 'react';

interface OptionsProps {
  onConfirm: (playerType: string, gameTime: number) => void;
}

function Options({ onConfirm }: OptionsProps) {
  const [playerType, setPlayerType] = useState<string | null>(null);
  const [gameTime, setGameTime] = useState<number | null>(null);

  const isSelectionComplete = playerType !== null && gameTime !== null;

  return (
    <div className="options">
      <h1>Options</h1>
      
      {/* Player Type 선택 */}
      <div className="option-group">
        <h2>Choose opponent:</h2>
        <button onClick={() => setPlayerType('person')} className={playerType === 'person' ? 'selected' : ''}>
          .vs Person
        </button>
        <button onClick={() => setPlayerType('computer')} className={playerType === 'computer' ? 'selected' : ''}>
          .vs Computer
        </button>
      </div>

      {/* Game Time 선택 */}
      <div className="option-group">
        <h2>Set Time:</h2>
        <button onClick={() => setGameTime(10)} className={gameTime === 10 ? 'selected' : ''}>
          10s
        </button>
        <button onClick={() => setGameTime(30)} className={gameTime === 30 ? 'selected' : ''}>
          30s
        </button>
        <button onClick={() => setGameTime(60)} className={gameTime === 60 ? 'selected' : ''}>
          60s
        </button>
      </div>

      {/* 둘 다 선택해야만 Start 버튼이 활성화됨 */}
      <button
        onClick={() => isSelectionComplete && onConfirm(playerType!, gameTime!)}
        disabled={!isSelectionComplete}
        className="start-game-btn"
      >
        Start Game
      </button>
    </div>
  );
}

export default Options;
