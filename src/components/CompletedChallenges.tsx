import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChanllenges.module.css';


export function CompletedChallenges() {
  const { challegesCompleted } = useContext(ChallengesContext);
  return (
    <div className={styles.completedChallengesContainer}>
        <span>Desafios Completos</span>
        <span>{challegesCompleted}</span>
    </div>
  );
}