import styles from "./logoutModal.module.css";
import { useNavigate,BrowserRouter as Router } from "react-router-dom";
import client from "../client";

function App(props){
    //sessionStorage.getItem('useId')
    
    const deltoken = () =>{
        client.defaults.headers.common['Authorization'] = undefined;
        sessionStorage.clear();
        window.location.replace('/inflow1');
    }
    //console.log(sessionStorage.getItem('token'));
    //console.log(sessionStorage.getItem('isLogin'));
    return(
        <div className={styles.background12}>
            <div className={styles.background13}></div>
            <div className={styles.background14}>
                <p className={styles.title}>로그아웃</p>
                <p className={styles.text}>정말 로그아웃 하시겠습니까?</p>
                <div className={styles.logoutbord}>
                    <div onClick={props.modalState5} className={styles.exit}>취소</div>
                    <div className={styles.logoutbtn} onClick={deltoken}>네</div>
                </div>
            </div>
        </div>
    )
};
export default App;