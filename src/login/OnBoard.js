import styles from'./onBoard.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App(){
  const navigate = useNavigate();

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_RURL;
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div className={styles.App}>
      
      <div className={styles.tag}>
        <div className={styles.close} onClick={()=>navigate('/inflow1')}></div>
        <div className={styles.tag1}></div>
        <h2 className={styles.tag2}><span>간편하게 가입하고</span>다양한 기능을 이용해보세요 !</h2>
        <div className={styles.laun}></div>
      </div>

      <div className={styles.buttonArea4}>
        <a href={KAKAO_AUTH_URI} className={styles.kakao_button}>
          <div className={styles.kakaologo}></div>
          <p className={styles.kakaotext}>카카오로 1초만에 시작하기</p>
        </a>

        <Link to = "/loginpage" className={styles.email_button}>
          <div className={styles.applelogo}></div>
          <p className={styles.emailtext}>이메일로 시작하기</p>
        </Link>
        
      </div>
      <div className={styles.login1}>이미 계정이 있나요?
      <Link to="/loginpage2" className={styles.login2}>로그인</Link>
      </div>
  </div>  
     
  )
}

export default App;

