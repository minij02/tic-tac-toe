import React from 'react';

interface TimerProps {
    timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
    return (
        <div className="timer">
            Time left: {timeLeft} seconds
        </div>
    );
};

export default Timer;