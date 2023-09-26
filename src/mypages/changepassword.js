import styles from './changepassword.module.css';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import client from '../client';
function App(){
    // const [userid,setuserid] = useState('');
    // setuserid("주연")
    const [curpw,setcurpw] = useState("");
    const [newpw,setnewpw] = useState("");
    const [newpwcon, setnewpwcon] = useState("");
    const [IsPwc, setIsPwc] = useState(false)

    const location = useLocation();
    const formData = new FormData();

    const navigate = useNavigate();
    let goBack = () => {
        navigate(-1);
      };
    const savePassword = event =>{
        setcurpw(event.target.value);
        console.log(event.target.value);
    }
    const newPassword=event =>{
        setnewpw(event.target.value);
        console.log(event.target.value);
    }
    const newpwC = event =>{
        setnewpwcon(event.target.value);
        setIsPwc(event.target.value==newpw);
        console.log(event.target.value);
    }
      const onSubmitHandler = (event) =>{
        event.preventDefault();

        const inputs = {
            "currentPassword" : curpw,
            "newPassword" : newpw           
        }   

        console.log(inputs);

        client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
        client.put('/users/'+sessionStorage.getItem('id')+'/password', inputs)
        .then(function (response) {
            console.log(response);
            alert("비밀번호 변경성공!");
            window.location.replace('/mypage');
        })
        .catch(function (error) {
            console.log(error);
            alert(error.response.data.error.message);
        })
        
    }
    return (
        <div className={styles.background11}>
            <div className={styles.bord1}>
                <button className={styles.arrow6} onClick={goBack}/>
                <p className={styles.mypagetitle}>비밀번호 변경</p>
            </div>
            <div className={styles.bord2}>
                <p className={styles.title}>비밀번호 변경</p>
                <input type="password" onChange={savePassword} placeholder="현재 비밀번호 " className={styles.box}></input>
            </div>
            <div className={styles.bord2}>
                <p className={styles.title}>새 비밀번호 </p>
                <input type="password" onChange={newPassword} placeholder="영어 대소문자, 특수문자, 숫자 포함 8~16자" className={styles.box}></input>
                <input type="password" onChange={newpwC} placeholder="비밀번호 재입력" className={styles.box}></input>
                {
                    IsPwc ? 
                    <p className={styles.passerror1} style={{color:'#4CF23E', fontSize:'1.5vh'}}>비밀번호가 일치합니다.</p> :
                    <p className={styles.passerror1} style={{color:'red',fontSize:'1.5vh'}}>비밀번호가 일치하지 않습니다.</p>
                }
            </div>
            
            {
                    IsPwc ?<button type='submit' className={styles.changepass} onClick={onSubmitHandler}>변경하기</button>
                    : <button type='submit' className={styles.changepass1}>변경하기</button>
                }
        </div>
    )
};
export default App;