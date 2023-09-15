import styles from './loginpage2.module.css';
import React, {useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App(){
    const navigate = useNavigate();

    return(
        <div className={styles.background5}>
            <div className={styles.arrow5} onClick={() => navigate(-1)}></div>
            <h1 className={styles.logintext2}>로그인하기</h1>
            <div className={styles.emailname}>이메일
                <input type="email" placeholder='이메일을 입력해주세요' className={styles.emailinput}></input>
            </div>
            
            <div className={styles.passwordname}>비밀번호
                <input type="password" placeholder='비밀번호를 입력해주세요' className={styles.emailinput}></input>
            </div>
            <Link to="" className={styles.loginbtn}>
                <button type='submit' value="로그인" className={styles.loginbtn1}>로그인</button>
            </Link>
            <div className={styles.find}>
                <Link to="" className={styles.findid}>아이디 찾기</Link>
                <Link to="" className={styles.findpw}>비밀번호 찾기</Link>
            </div>
            <div className={styles.easy}>
                <div className={styles.line1}>
                    <div className={styles.easylogin}>간편 로그인</div>
                </div>
                
                <Link to = "" className={styles.kakao_button}>
                    <div className={styles.kakaologo}></div>
                    <p className={styles.kakaotext}>카카오로 로그인</p>
                </Link> 
            </div>
            
        </div>
    );

}

export default App;