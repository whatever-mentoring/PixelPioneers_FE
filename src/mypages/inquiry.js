import styles from './inquiry.module.css';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate,BrowserRouter as Router } from "react-router-dom";
function App(){
    // const [userid,setuserid] = useState('');
    // setuserid("주연")
    const navigate = useNavigate();
    let goBack = () => {
        navigate(-1);
      };
    
    const handleCopyClipBoard = async (text="string") => {
    try {
        await navigator.clipboard.writeText(text);
        alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
        alert('복사에 실패하였습니다');
    }
};
    return (
        <div className={styles.background11}>
            <div className={styles.bord1}>
                <button className={styles.arrow6} onClick={goBack}/>
                <p className={styles.mypagetitle}>문의하기</p>
            </div>
            <div className={styles.bord2}>
                <p className={styles.title}>개발자 메일</p>
                <div  className={styles.box}><p className={styles.manageemail}>juyeon-gang1092@naver.com</p></div>
                <button type="button" className={styles.copy} onClick={() => {handleCopyClipBoard('juyeon-gang1092@naver.com')}}>복사</button>
            </div>
            
        </div>
    )
};
export default App;
