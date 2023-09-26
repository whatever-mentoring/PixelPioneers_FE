import styles from './password.module.css';
import React, {useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';




function App(){
    const location = useLocation();

    const [UserPassword,setUserPassword]=useState("");
    const [IsPassword, setIsPassword] = useState(false);

    const savePassword = event =>{
        setUserPassword(event.target.value);
        setIsPassword(event.target.value.toLowerCase().match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/))
    }

    const [UserPwc, setUserPwc]=useState("");
    const [IsPwc, setIsPwc]=useState(false);

    const PasswordC=event =>{
        setUserPwc(event.target.value);
        setIsPwc(event.target.value==UserPassword);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
    return(
        <div className={styles.background3}>
            <div className={styles.signin}>
                <Link to="/loginpage"><div className={styles.arrow3}></div></Link>
                <div className={styles.pagetitle}>회원가입</div>
            </div>
            <div className={styles.pass} style={ IsPassword ? {borderBottom: '0.1vh solid #62E857'} : {borderBottom: '0.1vh solid red'}}>
                <div className={styles.pass1}>비밀번호 입력</div>
                <input className={styles.password}type='password' onChange={savePassword} placeholder='비밀번호 입력(영어 대소문자, 특수문자, 숫자포함 8~16자)' minLength="8" required></input>
                {
                    IsPassword ? 
                    <p className={styles.passerror} style={{color:'#4CF23E'}}>사용 가능한 비밀번호입니다.</p>
                    :
                    <p className={styles.passerror} style={{color:'red'}}>영어 대소문자, 특수문자, 숫자포함 8~16자로 적어주세요.</p>
                }
                
            </div>
            
            <div className={styles.pass2} style={ IsPwc && IsPassword ? {borderBottom: '0.1vh solid #62E857'} : {borderBottom: '0.1vh solid red'}}>
                <div className={styles.pass3}>비밀번호 확인</div>
                <input className={styles.passwordc}type='password' onChange={PasswordC} placeholder='비밀번호 다시 쓰기' minLength="8" required></input>
                {
                    IsPwc && IsPassword ? 
                    <p className={styles.passerror1} style={{color:'#4CF23E'}}>비밀번호가 일치합니다.</p> :
                    <p className={styles.passerror1} style={{color:'red'}}>비밀번호가 일치하지 않습니다.</p>
                }
                
            </div>
            
            <div className={styles.buttonarea1}>
                {
                    IsPwc && IsPassword ? <Link to="/nickname" state={{UserEmail:location.state.Email, UserPassword:UserPassword}} className={styles.button3} style={{backgroundColor: '#1C66FD'}}>계속하기</Link>
                    : <button className={styles.button3} value="계속하기">계속하기</button>
                }
            </div>
        </div> 
    );
}   

export default App;