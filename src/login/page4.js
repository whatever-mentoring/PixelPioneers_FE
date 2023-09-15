import './page4.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App(){
  const navigate = useNavigate();

  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/Oauth";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


  return (
    <div className="App">
      <div className="close" onClick={()=>navigate(-1)}></div>
      <div className="tag">
        <h1 className="tag1">모아모아</h1>
        <h2 className="tag2">간편하게 가입하고 <br/>다양한 기능을 이용해보세요 !</h2>
        <div className='laun'></div>
      </div>
           
      <div className='buttonArea4'>
        <a href={KAKAO_AUTH_URI} className="kakao_button">
          <div className="kakaologo"></div>
          <p className='kakaotext'>카카오로 1초만에 시작하기</p>
        </a>
        
        <Link to = "/loginpage" className="email_button">
          <div className="applelogo"></div>
          <p className='emailtext'>이메일로 시작하기</p>
        </Link>
      </div>
      <div className='login1'>이미 계정이 있나요?
      <Link to="/loginpage2" className='login2'>로그인</Link>
      </div>
  </div>  
     
  )
}

export default App;

