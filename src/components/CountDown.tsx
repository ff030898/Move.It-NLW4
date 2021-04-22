import { useContext } from 'react';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/Contdown.module.css';



export function Countdown() {
    
     const {minutes, seconds, hasFinish, isActive, resetCountDown, startCountDown} = useContext(CountDownContext);
    //Se a string não possui dois caracteres coloca o 0 na frente do número
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    //Se a string não possui dois caracteres coloca o 0 na frente do número
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

    
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

            {hasFinish ? (
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>

                    {isActive ? (

                        <button
                            type="button"
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountDown}>
                            Abandonar ciclo
                        </button>

                    ) :
                        <button type="button" className={styles.countdownButton} onClick={startCountDown}>
                            Iniciar um ciclo
                        </button>

                    }
                </>
            )}


        </div>
    );
}