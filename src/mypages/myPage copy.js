import styles from './myPage.module.css';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate,BrowserRouter as Router } from "react-router-dom";
import LogoutModal from "./logoutModal";
function App(props){
    // const [userid,setuserid] = useState('');
    // setuserid("주연")
    const navigate = useNavigate();
    let goBack = () => {
        navigate(-1);
      };
    const [outModal, setOutModal] = useState(false);
    const modalState5 = () => {
        setOutModal(!outModal);
    }

    return (
        <div className={styles.background11}>
            
            <div className={styles.bord1}>

                <button className={styles.arrow6} onClick={goBack}/>
                <p className={styles.mypagetitle}>마이페이지</p>
                <img loading="lazy" className={styles.userimage} src={sessionStorage.getItem("image")}></img>
                <p className={styles.username}>{sessionStorage.getItem("nickname")} 님</p>
            </div>
            <div className={styles.bord2}>
                { outModal ? <LogoutModal modalState5={modalState5}/> : null}
                <div className={styles.setuser}>내 정보 관리</div>
                <Link to="/changeprofile"><div className={styles.changprofile}>프로필 변경
                <div className={styles.arrow8}></div>
                </div></Link>
                <Link to="/changepassword"><div className={styles.changprofile}>비밀번호 변경</div></Link>
            </div>
            <div className={styles.bord3}>
                <div className={styles.setuser}>이용안내</div>
                <Link to="/inquiry"><div className={styles.changprofile}>문의하기</div></Link>
                <Link to=""><div className={styles.changprofile}>개인정보</div></Link>
                <div className={styles.changprofile}>앱버전
                    <div className={styles.versionimage}></div>
                </div>
                <Link to=""><div className={styles.changprofile}>이용약관</div></Link>
            </div>
            <div>
                <div className={styles.setuser}>기타</div>
                <Link to=""><div className={styles.changprofile}>정보동의</div></Link>
                <Link to="/secession"><div className={styles.changprofile}>회원탈퇴</div></Link>
                <div onClick={modalState5}className={styles.changprofile}>로그아웃
                    <div className={styles.logoutimage}></div>
                </div>
            </div>
        </div>
    )
};
export default App;