import styles from './css/inflow1.module.css';
import classNames from 'classnames';
import { Link, useAsyncError, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import {React} from 'react';
import axios from 'axios';
import Wrapper from './recircleComponets/Wrapper';
import '../login/page4.css';

function App1(){
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const navigate = useNavigate();
  const [boxImgClassName, setboxImgClassName] = useState(styles.boxImg);

  const nextPage = async event => {
    await delay(500);
    navigate('/inflow2');
  }


  return (
    <Wrapper>
    <div className={styles.App1}>
      <div className={styles.content}>
        <div className={styles.invisibleNav}>
          <Link to="/mainPage" className={styles.test}>(Test)메인화면으로</Link>
          <Link to="/onBoard" className={styles.logIn}>시작하기</Link>
        </div>
        <div className={styles.mainLogo}>
          <div className={styles.logoTop}>포즈가 고민될 때는?</div>
          <div className={styles.logoBottom}></div>
        </div>
        <div className={styles.imgContainer} onClick={() => {nextPage()}}>
          <div className={styles.boxImg}></div>
          
          <div>
            <div className={styles.script1}>랜덤포즈 뽑기</div>
            <div className={styles.script2}>여기를 클릭하세요</div>
          </div>
        </div>
      </div>
      <Link to="/mainPage" state={{ Tap: 1 }} className={styles.randBtn1}>사진첩 만들기</Link>
      {/* <button onClick={() => {
	      axios.get('http://3.85.130.74:8080/photos') // GET 요청
  	    .then((res) => {console.log(res.data)}) // 출력
      }}>httpget</button> */}
    </div>
    </Wrapper>
  )



}

export default App1;