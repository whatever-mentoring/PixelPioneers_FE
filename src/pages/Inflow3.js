import './css/inflow3.css';
import { Link, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function App3(){
  const { people } = useParams();
  const location = useLocation();
  console.log(location);

  return (
    <div className="App3">
      <div className="inflow3Script">이 포즈로 찍어볼까요?</div>
      <div className="hashTag"># {location.state.people}명이서</div>
      <div className="poseAria">
        <div className="tape"></div>
        <div className="pose"></div>
        <button className="poseBtn">다른 포즈 원해요!</button>
        <button className="poseBtn">
          <Link to="/AllPoses" className="linkPose">포즈 모아보기</Link>
        </button>
      </div>
      <Link to="/photoAlbum" className='makeArchive'>
        <div className='makeArchiveText'>사진첩<br/>만들기</div>
        <div className='arrow00'></div>
      </Link>
    </div>
  )
}

export default App3;