import styles from './loginpage2.module.css';
import React, {useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import client from '../client';
import { eventWrapper } from '@testing-library/user-event/dist/utils';

function App(){
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [disableBtn , setDisableBtn] = useState(false);
    const [UserEmail, setUserEmail] = useState('');

    //const REST_API_KEY = "b59aee3993ebe9ad7fbb5727b2539f35";
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_RURL;
    //const REDIRECT_URI = "http://moamoa4cut.net/Oauth";
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms)); // 딜레이

    const reset1 = () => {
        setEmail('');
    }

    const reset2 = () => {
        setPassword('');
    }
    const nextPage = async event => {
        navigate('/inflow2');
      }

    // sessionStorage.setItem('token', "");
    // sessionStorage.setItem('isLogin', false); // 로그인 전에 기존 로그인 정보 초기화

    const savePassword = event => {
        setPassword(event.target.value);
    }

    const saveEmail = event => {
        setEmail(event.target.value);
    }

    const onSubmitHandler =  async event  => {
        // 버튼만 누르면 리프레시 되는것을 막아줌
        event.preventDefault();

        if(email == "" || password == ""){
            //console.log("empty");
            setEmail("");
            setPassword("");
            return; 
        }

        setDisableBtn(true); // 버튼 클릭 시 post요청 완료 전까지 비활성화

        let loginData = {
            "email" : email,
            "password" : password,
        }

        client.post('/login', loginData)
            .then(function (response) {
                //console.log(response);
                setToken(response.headers.authorization);
                sessionStorage.setItem('token', response.headers.authorization);
                sessionStorage.setItem('nickname', response.data.response.nickname);
                sessionStorage.setItem('image', response.data.response.image);
                sessionStorage.setItem('id', response.data.response.id);
                sessionStorage.setItem('email', response.data.response.email);
                sessionStorage.setItem('isLogin', true);
                client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
                navigate('/mainPage');
            })
            .catch(function (error) {
                //console.log(error);
                alert(error.response.data.error.message);
            })
            .finally(function () {
                setDisableBtn(false); // 버튼 활성화
            });
    }

    const createAlbums = (event) => {
        event.preventDefault();

        const albumData = {
            "image": "test_image2",
            "name": "test_name2",
            "userIdList": [ 4 ]
        }

        client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
        client.post('albums', albumData)
            .then(function (response) {
                //console.log(response);
            })
            .catch(function (error) {
                //console.log(error);
                //console.log(error.response.data.error.message);
            });
    }
    

    return(
        <div className={styles.background5}>
            <div className={styles.arrow5} onClick={() => navigate(-1)}></div>
            <h1 className={styles.logintext2}>로그인하기</h1>
            <form onSubmit={onSubmitHandler}>
                <div className={styles.emailname}>이메일
                    <input type="email" placeholder='이메일을 입력해주세요' onChange={saveEmail} value={email} className={styles.emailinput} required></input>
                    <div className={styles.del} onClick={reset1}></div>
                </div>
                <div className={styles.passwordname}>비밀번호
                    <input type="password" placeholder='비밀번호를 입력해주세요' onChange={savePassword} value={password} className={styles.emailinput} required></input>
                    <div className={styles.del} onClick={reset2}></div>
                </div>
                {disableBtn ? <div className={styles.loginbtn1}>로그인 중...</div> : <button type='submit' value="로그인" className={styles.loginbtn1}>로그인</button>}
                
            </form>
            <div className={styles.find}>
                <Link to="" className={styles.findid}>아이디 찾기</Link>
                <Link to="" className={styles.findpw}>비밀번호 찾기</Link>
            </div>
            <div className={styles.easy}>
                <div className={styles.line1}>
                    <div className={styles.easylogin}>간편 로그인</div>
                </div>
                
                <div className={styles.kakao_button}>
                    <div className={styles.kakaologo}></div>
                    <a href={KAKAO_AUTH_URI} className={styles.kakaotext}>카카오로 로그인</a>
                </div> 
            </div>
            
           
        </div>
    );

}

export default App;