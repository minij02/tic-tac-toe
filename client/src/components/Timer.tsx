import React from 'react';

interface TimerProps {
    timeLeft: number; // 남은 시간을 초 단위로 전달받음
}

function Timer ({ timeLeft }: TimerProps) {

    /**
     * 남은 시간을 보여주는 div를 렌더링.
     * 시간은 초 단위로 표시되며 "Time left: {timeLeft} seconds" 형식으로 출력.
     * 
     * @returns JSX.Element - 남은 시간을 보여주는 div 요소
     */
    return (
        <div className="timer">
            Time left: {timeLeft} seconds
        </div>
    );
};

export default Timer;