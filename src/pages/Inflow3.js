import './inflow3.css';
import { useState } from 'react';

function App3(){

  return (
    <div className="App3">
      <div className="tag"># 연인이랑</div>
      <div className="poseAria">
        <div className="tape"></div>
        <div className="pose"></div>
        <button className="retry">다른 포즈 원해요!</button>
      </div>
      <button className='otherPose'>포즈<br/>모아보기<br/>
        <div className='arrow0'></div>
      </button>
    </div>
  )
}

export default App3;