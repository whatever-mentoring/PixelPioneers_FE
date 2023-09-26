import styles from "./css/needLoginModal.module.css";
import { useNavigate,BrowserRouter as Router } from "react-router-dom";

function App(props){
    //props.modal
    const navigate = useNavigate();
    
    const gotoOnboard = () =>{
        navigate("/onboard");
    }

    //console.log(sessionStorage.getItem('token'));
    //console.log(sessionStorage.getItem('isLogin'));

    return(
        <div className={styles.background12}>
            <div className={styles.background13}></div>
            <div className={styles.background14}>
                <p className={styles.title}>로그인하고 더 많은 기능을<br/>이용해보세요!</p>
                <div className={styles.logoutbord}>
                    <div onClick={props.modalState} className={styles.exit}>취소</div>
                    <div className={styles.logoutbtn} onClick={gotoOnboard}>로그인하러 가기</div>
                </div>
            </div>
        </div>
    )
};
export default App;