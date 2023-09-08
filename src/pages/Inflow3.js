import './inflow3.css';
import { Link } from "react-router-dom";
import { useState } from 'react';

function App3(){

  return (
    <div className="App3">
      <div className="inflow3Script">이 포즈로 찍어볼까요?</div>
      <div className="tag"># 연인이랑</div>
      <div className="poseAria">
        <div className="tape"></div>
        <div className="pose"></div>
        <button className="poseBtn">다른 포즈 원해요!</button>
        <button className="poseBtn">
          <Link to="/inflow4" className="linkPose">포즈 모아보기</Link>
        </button>
      </div>
      <Link to="/photoAlbum" className='makeArchive'>사진첩<br/>만들기<br/>
        <div className='arrow0'></div>
      </Link>
    </div>
  )
}

export default App3;