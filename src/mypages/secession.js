import styles from './secession.module.css';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import client from '../client';
function App(){
    // const [userid,setuserid] = useState('');
    // setuserid("주연")
    const navigate = useNavigate();
    const [curpw,setcurpw] = useState("");
    const [IsPwc,setIsPwc] = useState(false);
    const formData = new FormData();
    const delpw = event =>{
        setcurpw(event.target.value);
        setIsPwc(event.target.value.toLowerCase().match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/));
    }
        let goBack = () => {
        navigate(-1);
      };
    
      const onSubmitHandler = (event) =>{
        event.preventDefault();

        const inputs = {
            "password" : curpw,
        }   
        const joinData = new Blob([JSON.stringify(inputs)], { type: "application/json" });

        formData.append('requestDTO', joinData);
        
    
        console.log(inputs);

        client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
        client.post('/users/'+sessionStorage.getItem('id')+'/withdrawal', inputs)
        .then(function (response) {
            client.defaults.headers.common['Authorization'] = undefined;
            sessionStorage.clear();
            window.location.replace('/inflow1');
            alert("탈퇴되었습니다.");
        })
        .catch(function (error) {
            console.log(error);
            alert(error.response.data.error.message);
        })
    }
    
        

    return (
        <div className={styles.background11}>
            <form onSubmit={onSubmitHandler}>
            <div className={styles.bord1}>
                <button className={styles.arrow6} onClick={goBack}/>
                <p className={styles.mypagetitle}>회원탈퇴하기</p>
            </div>
            <div className={styles.bord2}>
                <p className={styles.title}>기존 계정 비밀번호 </p>
                <input type="password" onChange={delpw} className={styles.box} required></input>
            </div>
            <div>
                <p className={styles.terms}>
                *탈퇴 후 회원가입 시 등록된 개인정보는 모두 삭제됩니다.<br/>
                *자세한 내용은 개인정보처리방침을 확인해주세요.<br/>
                *탈퇴 시 포함되어 있는 모든 사진첩에서 나가집니다.<br/>
                *탈퇴 시 사진첩에 자신이 업로드 한 사진은 삭제되며 포즈모아보기에 <br/> 올린 경우 사진이 삭제됩니다.
                </p>
            </div>
            
            {
                    IsPwc ?<button type='submit' className={styles.changepass}>회원탈퇴</button>
                    : <button type='submit' className={styles.changepass1}>회원탈퇴</button>
                }
            </form>
        </div>
    )
};
export default App;