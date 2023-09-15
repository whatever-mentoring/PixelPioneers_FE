import styles from './loginpage.module.css';
import React, {useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';




function App(){
    const navigate = useNavigate();

    const [IsEmail, setIsEmail]=useState(false);
    const [UserEmail, setUserEmail]=useState("");
    const saveEmail = event =>{
        setUserEmail(event.target.value); //실시간으로 입력한 값을 useremail 변수에 저장
        console.log(event.target.value);
        setIsEmail(event.target.value.toLowerCase().match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/));
    }
    
    return(
        <div className={styles.background2}>
            <div className={styles.close} onClick={()=>navigate(-1)}></div>
            <div className={styles.logintitle}>추억이 담긴 사진첩을 <br/>  만들어볼까요?</div>
            <div className={styles.emailform} style={ IsEmail ? {borderBottom: '0.1vh solid #62E857'} : {borderBottom: '0.1vh solid red'} }>
                <div className={styles.emailtitle}>먼저 이메일을 입력해주세요.</div>
                <input type="email" onChange={saveEmail} placeholder='email@example.com' className={styles.email}></input>
            </div>
            
            {
                IsEmail ? <div className={styles.emailc}>사용 가능한 이메일입니다. </div> : <div className={styles.emailcr}>유효하지 않은 이메일입니다.</div>
            }
            <div className={styles.buttonarea}>
                {
                    IsEmail ? <Link to="/password" className={styles.buttonarea}><button type='submit' className={styles.button} value="계속하기">계속하기</button></Link>
                    : <div className={styles.move1}><button type='submit' className={styles.button1} value="계속하기">계속하기</button></div>
                }
                
            </div>
        </div>
    );
}   
export default App;