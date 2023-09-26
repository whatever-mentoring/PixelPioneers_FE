import styles from './css/inflow1.module.css';
import classNames from 'classnames';
import { Link, useAsyncError, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import {React} from 'react';
import LoginModal from "./recircleComponets/needLoginModal";

import Wrapper from './recircleComponets/Wrapper';

function App1(){
  const [modal, setModalState] = useState(false);

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const navigate = useNavigate();
  const [boxImgClassName, setboxImgClassName] = useState(styles.boxImg);

  const nextPage = async event => {
    await delay(400);
    navigate('/inflow2');
  }

  const albumPage = () => {
    if(sessionStorage.getItem('isLogin')){
      navigate('/mainpage', {state:{
        Tap : 1
      }});
    } else {
      modalState();
    }
  }

  const modalState = () => {
    setModalState(!modal);
  }



  return (
    <Wrapper>
    <div className={styles.App1}>
      {modal ? <LoginModal modalState={modalState}/>: null}
      <div className={styles.content}>
        <div className={styles.invisibleNav}>
          <Link to="/onBoard" className={styles.logIn}>시작하기</Link>
        </div>
        <div className={styles.mainLogo}>
          <div className={styles.logoTop}>포즈가 고민될 때는?</div>
          <div className={styles.logoBottom}></div>
        </div>
        <div className={styles.imgContainer} onClick={() => {nextPage()}}>
          <div className={styles.boxImg}></div>
          <div>
            <div className={styles.script1}>랜덤포즈 뽑기</div>
            <div className={styles.script2}>여기를 클릭하세요</div>
          </div>
        </div>
      </div>
      <div className={styles.randBtn1} onClick={albumPage}>사진첩 만들기</div>
    </div>
    </Wrapper>
  )



}

export default App1;