import React from 'react';

interface WelcomeProps {
  onStart: () => void;
}

function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="welcome">
      <h1>Welcome to Tic-Tac-Toe!</h1>
      <button onClick={onStart} className="start-btn">Start</button>
    </div>
  );
}

export default Welcome;
