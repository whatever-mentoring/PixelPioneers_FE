import styles from './password.module.css';
import React, {useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";



function App(){
    const navigate = useNavigate();

    const [UserPassword,setUserPassword]=useState("");
    const [IsPassword, setIsPassword] = useState(false);

    const savePassword = event =>{
        setUserPassword(event.target.value);
        console.log(event.target.value);
        setIsPassword(event.target.value.toLowerCase().match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/))
    }

    const [UserPwc, setUserPwc]=useState("");
    const [IsPwc, setIsPwc]=useState(false);

    const PasswordC=event =>{
        setUserPwc(event.target.value);
        console.log(event.target.value);
        setIsPwc(event.target.value==UserPassword);
    }
    
    return(
        <div className={styles.background3}>
            <div className={styles.signin}>
                <div className={styles.arrow3} onClick={()=>navigate(-1)}></div>
                <div className={styles.pagetitle}>회원가입</div>
            </div>
            <div className={styles.pass} style={ IsPassword ? {borderBottom: '0.1vh solid #62E857'} : {borderBottom: '0.1vh solid red'}}>
                <div className={styles.pass1}>비밀번호 입력</div>
                <input className={styles.password}type='password' onChange={savePassword} placeholder='비밀번호 입력(영어 대소문자, 특수문자, 숫자포함 8~16자)' minLength="8" required></input>
                
                <p className={styles.passerror} style={IsPassword ? {color:'#1C54A9'} : {color:'red'}}>영어 대소문자, 특수문자, 숫자포함 8~16자로 적어주세요.</p>
            </div>
            
            <div className={styles.pass2} style={ IsPwc ? {borderBottom: '0.1vh solid #62E857'} : {borderBottom: '0.1vh solid red'}}>
                <div className={styles.pass3}>비밀번호 확인</div>
                <input className={styles.passwordc}type='password' onChange={PasswordC} placeholder='비밀번호 다시 쓰기' minLength="8" required></input>
                <p className={styles.passerror1} style={IsPwc ? {color:'#1C54A9'}: {color:'red'}}>비밀번호가 일치하지 않습니다.</p>
            </div>
            
            <div className={styles.buttonarea1}>
                
                {
                    IsPwc ? <Link to="/nickname" className={styles.buttonarea1}><button type='submit'  value="계속하기" className={styles.button2}>계속하기</button></Link>
                    : <div className={styles.move2}><button type='submit' className={styles.button3} value="계속하기">계속하기</button></div>
                }
            </div>
        </div> 
    );
}   

export default App;