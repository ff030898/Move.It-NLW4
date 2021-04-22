import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

let countdownTimeout: NodeJS.Timeout;

interface CountDownProviderProps{
    children: ReactNode;
}

interface CountDownContextData {
    minutes:number;
    seconds:number;
    isActive:boolean;
    hasFinish:boolean;
    startCountDown:() => void;
    resetCountDown: () => void;
}

export const CountDownContext = createContext({} as CountDownContextData);

export function CountDownProvider({children}: CountDownProviderProps) {
    
    const { startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime] = useState(0.05 * 60);
    const [isActive, setActive] = useState(false);
    const [hasFinish, setHasFinish] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountDown() {
        setActive(true);
    }

    function resetCountDown() {
        clearTimeout(countdownTimeout);
        setActive(false);
        setHasFinish(false);
        setTime(0.05 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinish(true);
            setActive(false);
            startNewChallenge();
        }
    }, [isActive, time])
    
    return (
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinish,
            isActive,
            startCountDown,
            resetCountDown

        }}>
            {children}
        </CountDownContext.Provider>
    )
}