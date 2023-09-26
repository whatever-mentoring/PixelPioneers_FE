import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client from "../client";
import logo from "../resource/img/mainPage/moamoa_k.png"

export default function Oauth() {

  // params로 받은 인가 코드를 code 변수에 저장
  const code = new URL(window.location.href).searchParams.get('code');

  //console.log(code);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        //console.log("/login/kakao?code="+code);
        // 토큰 axios 요청
        const res = await client.get("/login/kakao?code="+code);
        const token = res.headers.authorization;
        // 받아온 토큰을 로컬 스토리지에 token으로 저장
        sessionStorage.setItem('token', res.headers.authorization);
        sessionStorage.setItem('nickname', res.data.response.nickname);
        sessionStorage.setItem('image', res.data.response.image);
        sessionStorage.setItem('id', res.data.response.id);
        sessionStorage.setItem('email', res.data.response.email);
        sessionStorage.setItem('isLogin', true);
        client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
        alert("로그인 성공!");
        // home으로 이동
        navigate('/mainPage');
      } catch (e) {
        console.error(e);
        alert("로그인 실패!");
        navigate('/inflow1');
      }
    })();
  }, []);

  return (
    <div style={{
      width:'100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
      }}>
      <img loading="lazy" src={logo} style={{width:'20vh'}}></img>
    </div>
  );
}