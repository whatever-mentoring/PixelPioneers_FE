import './page4.css';
import { useState } from 'react';

function AppLogin(){

  return (
    <div className="AppLogin">
      <div className="tag"><a className="tag1">소중한 사람과</a><h1 className="tag2">모아모아</h1></div>
      <div className="vector1"></div>
      <div className="container">       
      
        <a href="#" className="naver_button">
          <div className="naverlogo"></div>
          네이버로 계속하기
        </a>       
        
        <a href="#" className="kakao_button">
          <div className="kakaologo"></div>
          카카오로 계속하기
        </a>        
        
        <a href="#" className="apple_button">
          <div className="applelogo"></div>
          애플로 계속하기
        </a>
      </div>  
    </div>    
  )
}

export default AppLogin;

