import './inflow2.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

function App2(){

  return (
    <div className="App2">
      <div className="invisible-nav">
        <div className="logIn">로그인</div>
        </div>
      <div className="mainLogo">
        <div className="logoTop">포즈가 고민될 때는?</div>
        <div className="logoBottom">모아모아</div>
      </div>
      <div className="peopleContainer">
        <div style={{paddingBottom:'3vh'}}>총 몇 명인가요?</div>
        <div>#1명이서</div>
        <div>#2명이서</div>
        <div>#3명이서</div>
        <div>#4명이서</div>
        <div>#5명이서</div>
        <div>#6명이서</div>
        <div>#그 이상</div>
      </div>
      <div className="randBtnAria">
      <Link to="/inflow3" className="randBtn2">랜덤포즈 뽑기</Link>
      </div>
    </div>
  )
}

export default App2;