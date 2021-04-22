import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

    const { activiteChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext);
    const { resetCountDown } = useContext(CountDownContext);

    function handleSuccessCompleted(){
        completedChallenge();
        resetCountDown();
    }

    function handleFailedCompleted(){
        resetChallenge();
        resetCountDown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activiteChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activiteChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activiteChallenge.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>{activiteChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleFailedCompleted}

                        >
                            Falhei
                       </button>
                        <button
                            type="button"
                            className={styles.challengeSuccessButton}
                            onClick={handleSuccessCompleted}
                        >
                            Completei
                       </button>
                    </footer>
                </div>
            ) :
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                        Avançe de level completando os desafios
                    </p>
                </div>
            }
        </div>
    );
}