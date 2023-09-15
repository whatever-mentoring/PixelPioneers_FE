import styles from './upload1.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function App(){
    return(
        <div>
            <div className={styles.controler}></div>
            <div className={styles.close}></div>
            <p className={styles.addname}>사진 추가하기</p>
            <div className={styles.box5}>
                <Link to="/page4"><div className={styles.plus3}></div></Link>
            </div>
            <div className={styles.upload}>사진 추가하기</div>
        </div>
    );
}
export default App;