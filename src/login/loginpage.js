import styles from './loginpage.module.css';
import React, {useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import client from '../client';
import { useLocation } from 'react-router-dom';


function App(){
    const navigate = useNavigate();
    const location=useLocation();
    const [IsEmail, setIsEmail]=useState(false);
    const [UserEmail, setUserEmail] = useState('');
    const [IsNotdup, setIsNotdup] = useState(false);

    
    const saveEmail = event =>{
        if(IsNotdup) setIsNotdup(false);
        setUserEmail(event.target.value); //실시간으로 입력한 값을 useremail 변수에 저장
        setIsEmail(event.target.value.toLowerCase().match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/));
    }
    const reset = () => {
        setUserEmail('');
    }


   
    const onSubmitHandler = (event) => {
        event.preventDefault();
    
        const emailData = {
            "email" : UserEmail
        }

        //console.log(emailData);   

        client.post('/email/check',emailData)
        .then(function (response) {
            //console.log(response);
            //console.log(response.data.success);
            setIsNotdup(response.data.success);
            navigate('/password',{state:{ Email:UserEmail }});
        })
        .catch(function(error){
            //console.log(error.response.data.success);
            setIsNotdup(error.response.data.success);
            alert("중복된 이메일입니다.");
        })  
        
}
    
    return(
        <div className={styles.background2}>
            <div className={styles.close} onClick={()=>navigate('/onboard')}></div>
            <div className={styles.logintitle}>추억이 담긴 사진첩을 <br/>  만들어볼까요?</div>
                <div className={styles.emailform} style={ IsEmail ? {borderBottom: '0.1vh solid #62E857'} : {borderBottom: '0.1vh solid red'} }>
                    <div className={styles.emailtitle}>먼저 이메일을 입력해주세요.</div>
                    <input type="email" onChange={saveEmail} value={UserEmail} placeholder='email@example.com' className={styles.email} required></input>
                    <div className={styles.sameemail} onClick={reset}></div>
                </div>
                
                {
                    IsEmail ? <div className={styles.emailc}>사용 가능한 이메일입니다. </div> : <div className={styles.emailcr}>이메일을 올바르게 입력해주세요.</div>
                }
                <div className={styles.buttonarea}>
                    {
                        IsEmail ? <div className={styles.buttonarea}><div className={styles.button} onClick={onSubmitHandler}>계속하기</div></div>
                        : <div className={styles.move1}><div className={styles.button1} value="계속하기">계속하기</div></div>
                    }  
                </div>
        </div>
    );
}   
export default App;
//onClick={navigate('/password',{state:{ Email:UserEmail }})}