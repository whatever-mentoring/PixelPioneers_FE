import styles from './css/folderModal.module.css';
import { useState, React, useEffect } from 'react';
import client from '../client';
import { Link } from 'react-router-dom';

function App(props){
    const qiutAlbum = () => {
        client.delete('/albums/'+props.albumId+'/members')
        .then(function(res){
            alert("앨범에서 나왔습니다.");
            props.modalState2();
            window.location.replace('/mainpage');
        })
        .catch(function(err){
            //console.log(err);
            alert("앨범에서 못 나왔습니다..");
            window.location.replace('/folder');
        });
    }

    return(
        <div className={styles.App}>
            <div className={styles.background6} onClick={props.modalState2}></div>
            <div className={styles.background7}>
                <p className={styles.msg1}>사진첩에서 정말 나가시겠습니까?</p>
                <p className={styles.msg2}>나가도 다시 돌아올 수 있어요</p>
                <div className={styles.goout} onClick={qiutAlbum}>나갈게요</div>
            </div>
        </div>
        
    );
    
}
export default App;