import styles from './css/PhotoAlbum.module.css'
import React from 'react';
import { Link } from 'react-router-dom';
import PhotoAlbumModal from "./PhotoAlbumModal";
import photopage from "../resource/Group 6.png";
import { useState } from 'react';



const App = () => {
  const [modal, setModal] = useState(false);

  const modalState = () => {
    setModal(!modal);
  }

  return (
    <div className={styles.photoAlbum}>
      {
      	  modal == true ? <PhotoAlbumModal modalState={modalState} /> : null  //기계역할
        }
      {/* <div className="invisible-nav">
        <div className="logIn" onClick={()=>{setModal(!modal)}}>로그인</div>
        </div> */}
        <div className={styles.box3}>
                <Link to="/page4"><div className={styles.arrow1}></div></Link>
                <div className={styles.username1}>juyeon님의 추억</div>
                <div className={styles.plus1} onClick={()=>{setModal(!modal)}}></div>
            </div>
            <div className={styles.group1}>
                <div className={styles.photo}><img src={photopage} className={styles.photopage}/><h5 className={styles.photogroup}>gdsc</h5></div>
                <div className={styles.photo}><img src={photopage} className={styles.photopage}/><h5 className={styles.photogroup}>gdsc</h5></div>
                <div className={styles.photo}><img src={photopage} className={styles.photopage}/><h5 className={styles.photogroup}>gdsc</h5></div>
                <div className={styles.photo}><img src={photopage} className={styles.photopage}/><h5 className={styles.photogroup}>gdsc</h5></div>
                <div className={styles.photo}><img src={photopage} className={styles.photopage}/><h5 className={styles.photogroup}>gdsc</h5></div>
                <div className={styles.photo}><img src={photopage} className={styles.photopage}/><h5 className={styles.photogroup}>gdsc</h5></div>
                <div className={styles.photo}><img src={photopage} className={styles.photopage}/><h5 className={styles.photogroup}>gdsc</h5></div>
                <div className={styles.photo}><img src={photopage} className={styles.photopage}/><h5 className={styles.photogroup}>gdsc</h5></div>
                <div className={styles.photo}><img src={photopage} className={styles.photopage}/><h5 className={styles.photogroup}>gdsc</h5></div>
                <div className={styles.photo}><img src={photopage} className={styles.photopage}/><h5 className={styles.photogroup}>gdsc</h5></div>
                <div className={styles.photo}><img src={photopage} className={styles.photopage}/><h5 className={styles.photogroup}>gdsc</h5></div>
            </div>
    </div>
  )
}

export default App;