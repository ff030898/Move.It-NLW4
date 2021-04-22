import Cookies from 'js-cookie';
import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challege {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallegensContextData {
    level: number;
    currentExperience: number;
    challegesCompleted: number;
    experienceToNextLevel: number;
    activiteChallenge: Challege;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallegensProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challegesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallegensContextData);

export function ChallengesProvider({ children, ...rest}: ChallegensProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challegesCompleted, setChallegesCompleted] = useState(rest. challegesCompleted ?? 0);

    const [activiteChallenge, setActiviteChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModal] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challegesCompleted', String(challegesCompleted));
    }, [level, currentExperience, challegesCompleted])

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModal(true);
        
    }

    function closeLevelUpModal(){
        setIsLevelUpModal(false);
    }

    async function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiviteChallenge(challenge);

        new Audio('notification.mp3').play();


        if (Notification.permission === "granted") {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp`
            })
        }
    }

    function resetChallenge() {
        setActiviteChallenge(null);
    }

    function completedChallenge() {
        if (!activiteChallenge) {
            return
        }

        const { amount } = activiteChallenge;
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiviteChallenge(null);
        setChallegesCompleted(challegesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider value={{ level, currentExperience, challegesCompleted, experienceToNextLevel, levelUp, startNewChallenge, activiteChallenge, resetChallenge, completedChallenge, closeLevelUpModal }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}

