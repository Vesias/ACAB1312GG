// timer-context.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TimerContext = createContext({
    currentTime: 60,
    startTimer: () => {},
    stopTimer: () => {},
    resetTimer: () => {},
});

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
    const [currentTime, setCurrentTime] = useState(60);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        let timer = null;
        if (timerActive && currentTime > 0) {
            timer = setTimeout(() => setCurrentTime(time => time - 1), 1000);
        } else if (currentTime <= 0 && timerActive) {
            stopTimer();
        }
        return () => clearTimeout(timer);
    }, [currentTime, timerActive]);

    const startTimer = useCallback((initialTime = 60) => {
        setCurrentTime(initialTime);
        setTimerActive(true);
    }, []);

    const stopTimer = useCallback(() => {
        setTimerActive(false);
    }, []);

    const resetTimer = useCallback((initialTime = 60) => {
        setCurrentTime(initialTime);
        setTimerActive(false);
    }, []);

    return (
        <TimerContext.Provider value={{ currentTime, startTimer, stopTimer, resetTimer }}>
            {children}
        </TimerContext.Provider>
    );
};
