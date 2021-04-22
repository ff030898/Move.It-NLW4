import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { ChallengeBox } from '../components/ChallengBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/CountDown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountDownProvider } from '../contexts/CountDownContext';
import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level:number;
  currentExperience:number;
  challegesCompleted:number;
}

export default function Home(props:HomeProps) {
  return (
    <ChallengesProvider
    level={props.level}
    currentExperience={props.currentExperience}
    challegesCompleted={props.challegesCompleted}
    >
    <div className={styles.container}>
      <Head>
        <title>Inicio | Move.it</title>
      </Head>
      <ExperienceBar />
      <CountDownProvider>
        <section>
          <div className={styles.leftContainer}>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>

          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountDownProvider>
    </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {

 
  const {level, currentExperience, challegesCompleted} = ctx.req.cookies;

  return {
    props: {
         level:Number(level), 
         currentExperience:Number(currentExperience), 
         challegesCompleted:Number(challegesCompleted)
    }
  }
}
