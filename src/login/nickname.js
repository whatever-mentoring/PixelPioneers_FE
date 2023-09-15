import styles from './nickname.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function App(){
    const navigate = useNavigate(-1);

    const [UserNickname,setUserNickname] = useState('');
    const [Isnickname, setIsnickname] = useState(false);
    const saveNickname = event =>{
        setUserNickname(event.target.value)
        setIsnickname(event.target.value.toLowerCase().match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,7}$/))
    }
    return(
        <div className={styles.background4}>
            <div className={styles.signin1}>
                <div className={styles.arrow4} onClick={()=>navigate(-1)}></div>
                <div className={styles.pagetitle1}>회원가입</div>
            </div>
            <div className={styles.nicknametitle}>마지막이에요 <br/> 프로필을 만들어주세요</div>
            <div className={styles.circle}><div className={styles.camera}></div></div>
            <div className={styles.nick}>
                <input className={styles.nickname} onChange={saveNickname} type='text' placeholder='닉네임을 적어주세요' minLength={1} maxLength="8" required></input>
                {/* 닉네임 중복검사 필요*/}
            </div>
            
            
            <div className={styles.buttonarea2}>
                
                {
                    Isnickname ? <Link to="" ><button type='submit'  value="계속하기" className={styles.button4} >시작하기</button></Link>
                    :<div ><button type='submit' className={styles.button5} value="계속하기">시작하기</button></div>
                }
            </div>
        </div> 
    );
}
export default App;