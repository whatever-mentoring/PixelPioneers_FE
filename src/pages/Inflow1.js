import './inflow1.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';

function App1(){

  const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/photos/3')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

  return (
    <div className="App1">
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
        <Link to="/inflow2" className="randBtn1">랜덤포즈 뽑기</Link>
      </div>
      <div>
            백엔드에서 가져온 데이터입니다 : {hello}
        </div>
    </div>
  )
}

export default App1;