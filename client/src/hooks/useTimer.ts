import { useState, useEffect } from 'react';

/**
 * useTimer - 타이머 기능을 제공하는 커스텀 훅
 * 
 * @param initialTime - 타이머의 초기 시간(초 단위)
 * @param onTimeUp - 타이머가 0이 되었을 때 호출되는 콜백 함수
 * @returns { timeLeft, resetTimer } - 남은 시간과 타이머를 초기화하는 함수 반환
 */
function useTimer(initialTime: number, onTimeUp: () => void) {
    // timeLeft - 남은 시간을 관리하는 상태
    const [timeLeft, setTimeLeft] =  useState(initialTime);

    /**
     * useEffect - 컴포넌트가 마운트될 때와 timeLeft가 변경될 때 호출됨.
     * 타이머가 1초마다 감소하며, 남은 시간이 0이 되면 onTimeUp 콜백을 호출함.
     * 컴포넌트가 언마운트될 때는 타이머를 클리어하여 불필요한 메모리 사용을 방지함.
     */
    useEffect(() => {
        // 시간이 0이 되었을 때 onTimeUp 콜백 호출
        if (timeLeft === 0) {
            onTimeUp(); 
        }

        // 타이머를 1초 간격으로 실행, 시간이 줄어듦
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime -1 : 0)); // 시간이 남아 있을 경우 감소
        }, 1000);

        // 컴포넌트가 언마운트되거나 타이머가 리셋될 때 타이머를 정리
        return () => clearInterval(timer); 
    }, [timeLeft, onTimeUp]); // timeLeft와 onTimeUp이 변경될 때마다 이 함수 실행

    /**
     * resetTimer - 타이머를 초기화하는 함수
     * 초기 시간을 다시 설정하여 타이머를 리셋함
     */
    const resetTimer = () => {
        setTimeLeft(initialTime); // 타이머를 초기 시간으로 리셋
    };

    // 남은 시간과 타이머 리셋 함수를 반환
    return { timeLeft, resetTimer };
}

export default useTimer;