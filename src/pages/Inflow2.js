import styles from './inflow2.module.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

function App(){   

  return (
    <div className={styles.App2}>
      <div className={styles.invisibleNav2}>
        <div className={styles.backBtn}></div>
        <div className={styles.inflow2Title}>포즈 모아보기</div>
        </div>
      <div className={styles.inflow2Script}>
        <div className={styles.inflow2ScriptFirst}>몇 명이서 사진을<br/>찍을 건가요?</div>
        <div className={styles.inflow2ScriptSecond}>사람 수에 따른 포즈를 추천해드릴게요!</div>
      </div>
      <div className={styles.peopleContainer}></div>
      <Link to="/inflow3" className={styles.randBtn2}>랜덤포즈 뽑기</Link>
    </div>
  )

}

export default App;