import '../App.css';
import { useState } from 'react';

function App(){

  return (
    <div className="App">
      <div className="invisible-nav">
        <div className="logIn">로그인</div>
        </div>
      <div className="mainLogo">
        <div className="logoTop">포즈가 고민될 때는?</div>
        <div className="logoBottom">모아모아</div>
      </div>
      <div className="imgContainer">
        <div className="boxImg">
          <div className="questionMark1"></div>
          <div className="questionMark2"></div>
          <div className="questionMark3"></div>
        </div>
      </div>
      <div className="randBtnAria">
        <button className="randBtn">랜덤포즈 뽑기</button>
      </div>
    </div>
  )
}

export default App;