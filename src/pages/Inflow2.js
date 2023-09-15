import styles from './css/inflow2.module.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Wrapper from './recircleComponets/Wrapper'
import { color } from 'framer-motion';

function App(){ 
  
  const navigate = useNavigate();
  let [peopleValue, setPeopleValue] = useState(0);
  let [rangeErrorState, setRangeErrorState] = useState(false);

  const minus = () => {
    if(peopleValue > 1){
      setPeopleValue(--peopleValue);
      if(rangeErrorState) {
        setRangeErrorState(false);
      }
    } else {
      setRangeErrorState(true)
    }
  }

  const plus = () => {
    if(peopleValue < 5){
      setPeopleValue(++peopleValue);
      if(rangeErrorState) {
        setRangeErrorState(false);
      }
    } else {
      setRangeErrorState(true)
    }
  }

  return (
    <Wrapper>
    <div className={styles.App2}>
      <div className={styles.content}>
        <div className={styles.invisibleNav2}>
          <div className={styles.backBtn} onClick={() => navigate(-1)}></div>
          <div className={styles.inflow2Title}>포즈 모아보기</div>
          </div>
        <div className={styles.inflow2Script}>
          <div className={styles.inflow2ScriptFirst}>몇 명이서 사진을<br/>찍을 건가요?</div>
          <div className={styles.inflow2ScriptSecond}>사람 수에 따른 포즈를 추천해드릴게요!</div>
        </div>
        <div className={styles.peopleContainer}>
          <div className={styles.minus} onClick={() => minus()}></div>
          <div className={styles.peoples}>{peopleValue}</div>
          <div className={styles.plus} onClick={() => plus()}></div>
        </div>
          {rangeErrorState ? <div className={styles.rangeError}>1 ~ 5명 이내로 선택해주세요</div> : null }
      </div>
       {
        peopleValue == 0 ?
        <div className={styles.randBtnDisabled}>뽑기</div>
        :
        <Link to={`/inflow3`} state={{ people: peopleValue }} className={styles.randBtn}>뽑기</Link>
       }     
    </div>
    </Wrapper>
  )
}

export default App;