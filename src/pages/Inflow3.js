import styles from './css/inflow3.module.css';
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import defaultImg from '../resource/img/inflow1/boxImg_K.png'
import client from '../client';
import LoginModal from "./recircleComponets/needLoginModal";
import { nanoid } from '@reduxjs/toolkit';

function App3(){
  const location = useLocation();
  const [people, setPeople] = useState(sessionStorage.getItem('people'));
  const [imgUrl, setImgUrl] = useState(defaultImg);
  const [imgWidth, setImgWidth] = useState('0vh');
  const [imgHeight, setImgHeight] = useState('0vh');
  const [modal, setModalState] = useState(false);
  const [idList, setIdList] = useState([0,0,0,0,0]);
  const [urlTmp, setUrlTmp] = useState("");
  const [isDup, setIsDup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('people') != undefined){
      client.get('/poses/random?peopleCount='+sessionStorage.getItem('people'))
        .then(function(res) {
          setImgUrl(res.data.response.image);
        })
        .catch(function(err) {
          //console.log(err);
        }).finally(function() {
          setImgWidth('30vh');
          setImgHeight('35vh');
        });
    }
  }, [])

  const otherPose = () => {
    setImgWidth('0vh');
    setImgHeight('0vh');
    client.get('/poses/random?peopleCount='+people)
      .then(function(res) {
        let isDup = false;
        for(let i = 0; i < 5; i++){
          //console.log(idList[idList.length-1-i]);
          if(res.data.response.id == idList[idList.length-1-i]){
            //console.log("중복입니다.");
            otherPose();
            return;
            isDup = true;
          }
        }
        setIdList([...idList, res.data.response.id]);
        if(!isDup){ setUrlTmp(res.data.response.image); }
    })
      .catch(function(err) {
        //console.log(err);
    })
      .finally(function(res) {
        //console.log(idList);
        return;
    });
  }

  useEffect(()=>{
    setImgWidth('30vh');
    setImgHeight('35vh');
    setImgUrl(urlTmp)
  }, [urlTmp]);

  const gotoAllposes = () => {
    sessionStorage.setItem('category', 'ROLE_ADMIN');
    navigate('/allposes');
  }

  const albumPage = () => {
    if(sessionStorage.getItem('isLogin')){
      navigate('/mainpage', {state:{
        Tap : 1
      }});
    } else {
      modalState();
    }
  }

  const modalState = () => {
    setModalState(!modal);
  }
  

  return (
    <div className={styles.App3}>
      {modal ? <LoginModal modalState={modalState}/>: null}
      <div className={styles.backBtn0} onClick={() => navigate(-1)}></div>
      <div className={styles.inflow3Script}>이 포즈로 찍어볼까요?</div>
      <div className={styles.hashTag}># {people}명이서</div>
      <div className={styles.poseAria}>
        <div className={styles.tape}></div>
        <div className={styles.imgArea0}>
          <img loading="lazy" className={styles.pose} src={imgUrl} style={{width:imgWidth, height:imgHeight}}></img>
        </div>
        <button className={styles.poseBtn} onClick={otherPose}>다른 포즈 원해요!</button>
        <button className={styles.poseBtn} onClick={gotoAllposes}>
          포즈 모아보기
        </button>
      </div>
      <div className={styles.makeArchive} onClick={albumPage}>
        <div className={styles.makeArchiveText}>사진첩<br/>만들기</div>
        <div className={styles.arrow00}></div>
      </div>
    </div>
  )
}

export default App3;