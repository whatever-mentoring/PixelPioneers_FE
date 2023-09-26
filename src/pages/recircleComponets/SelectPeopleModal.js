import styles from "./css/selectPeopleModal.module.css";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const App = (props) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [modalAreaBottom, setModalAreaBottom] = useState("-50vh");
  
  let [peopleValue, setPeopleValue] = useState(sessionStorage.getItem('people') != undefined ? sessionStorage.getItem('people') : 1);
  let [rangeErrorState, setRangeErrorState] = useState(false);
  
  const minus = () => {
    if (peopleValue > 1) {
      setPeopleValue(--peopleValue);
      if (rangeErrorState) {
        setRangeErrorState(false);
      }
    } else {
      setRangeErrorState(true);
    }
  };

  const plus = () => {
    if (peopleValue < 5) {
      setPeopleValue(++peopleValue);
      if (rangeErrorState) {
        setRangeErrorState(false);
      }
    } else {
      setRangeErrorState(true);
    }
  };

  const setsessionStoragePeople = () => {
    sessionStorage.setItem('people', peopleValue);
    props.modalState();
  }

  useEffect(() => {
    setModalAreaBottom("0vh");
  }, []);

  return (
    <div className={styles.Modal}>
      <div className={styles.ModalBackground} onClick={props.modalState}></div>
      <div className={styles.ModalArea} style={{ bottom: modalAreaBottom }}>
        <div className={styles.inflow2Script}>
          <div className={styles.inflow2ScriptFirst}>
            몇 명이서 찍을 건가요?
          </div>
          <div className={styles.inflow2ScriptSecond}>
            인원 수에 따른 포즈를 추천해드릴게요!
          </div>
        </div>
        <div>
          <div className={styles.peopleContainer}>
            <div className={styles.minus} onClick={() => minus()}></div>
            <div className={styles.peoples}>{peopleValue}</div>
            <div className={styles.plus} onClick={() => plus()}></div>
          </div>
            <div className={styles.rangeError} style={!rangeErrorState ? {color:'white'} : {}}>1 ~ 5명 이내로 선택해주세요</div>
        </div>
        <div className={styles.footer}>
          <div className={styles.canselBtn} onClick={props.modalState}>취소</div>
          <div className={styles.viewPoseBtn} onClick={setsessionStoragePeople}>랜덤포즈 보기</div>
        </div>
      </div>
    </div>
  );
};

export default App;
