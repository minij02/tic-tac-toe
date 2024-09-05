import React, { useState } from 'react';
import Game from './components/Game';
import Options from './components/Options';
import Welcome from './components/Welcome';

function App() {
  const [step, setStep] = useState(1);  // 1: Welcome, 2: Options, 3: Game
  const [playerType, setPlayerType] = useState<string | null>(null);  // vs Person or vs Computer
  const [gameTime, setGameTime] = useState<number | null>(null);  // 10s, 30s, 60s

  // 화면 이동 함수
  const goToOptions = () => setStep(2);  // Welcome -> Options
  const startGame = (playerType: string, gameTime: number) => {
    setPlayerType(playerType);
    setGameTime(gameTime);
    setStep(3);  // Options -> Game
  };

  return (
    <div className="App">
      {step === 1 && <Welcome onStart={goToOptions} />}
      {step === 2 && <Options onConfirm={startGame} />}
      {step === 3 && <Game playerType={playerType} gameTime={gameTime} />}
    </div>
  );
}

export default App;

