import styles from './nickname.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cameram from '../resource/cameram.png';
import { useLocation, useNavigate } from 'react-router-dom';
import client from '../client';
import defaultImg from '../resource/img/mainPage/usericon_k.png'
import axios from 'axios';
import imageCompression from 'browser-image-compression';

function App(){
    const navigate = useNavigate();
    const [UserNickname,setUserNickname] = useState('');
    const [Isnickname, setIsnickname] = useState(false);
    const [file, setFile] = useState("");
    const [IsNotdup,setIsNotdup] = useState(false);
    const [disableBtn , setDisableBtn] = useState(false);
    const location= useLocation();
    const formData = new FormData();

    useEffect(() => {
        fetch(defaultImg)
        .then(async response => {
            const contentType = response.headers.get('content-type')
            const blob = await response.blob()
            const file = new File([blob], 'defaultImg', { contentType })
            setFile(file);
        })
    }, [])

    const checkDup = () => {
        //console.log(file);
        const inputs = {
            "nickname" : UserNickname         
        }

        client.post('/nickname/check',inputs)
        .then(function (response) {
            //console.log(response);
            //console.log(response.data.success);
            setIsNotdup(response.data.success);
            alert("중복되지 않은 닉네임입니다.");                                                                                    
        })
        .catch(function(error){
            //console.log(error.response.data.success);
            setIsNotdup(error.response.data.success);
            alert("중복된 닉네임입니다.");
        })  
    }

    
        
    const saveNickname = event =>{
        setUserNickname(event.target.value);
        setIsnickname(event.target.value.toLowerCase().match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,7}$/));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setDisableBtn(true);

        const inputs = {
            "email" : location.state.UserEmail,
            "nickname" : UserNickname,
            "password" : location.state.UserPassword            
        }
        const joinData = new Blob([JSON.stringify(inputs)], { type: "application/json" });

        formData.append('requestDTO', joinData);
        formData.append('file', file);

        await client.post('/join', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(function (response) {
            //console.log(response);
            alert("회원가입 성공!");
            navigate('/loginpage2');
        })
        .catch(function (error) {
            //console.log(error);
            alert(error.response.data.error.message);
        })
        .finally(function() {
            setDisableBtn(false);
        })
    }

    const [imageSrc, setImageSrc] = useState('');

    const encodeFileToBase64 = (fileBlob) => {
        if(fileBlob!=null){
            const reader = new FileReader();
            reader.readAsDataURL(fileBlob);

            if(fileBlob.size >= 1048576){
                // 이미지 압축  
                //console.log("이미지 압축 진행")
                const options = {
                  maxSizeMB: 1, // 최대 파일 크기 (1MB로 설정)
                  maxWidthOrHeight: 1920, // 이미지의 최대 너비 또는 높이
                };
                
                imageCompression(fileBlob, options)
                  .then((compressedImage) => {
                    //console.log("압축완료.")
                    //console.log(compressedImage);
                    compressedImage = new File([compressedImage], fileBlob.name, { type: 'image/png' })
                    //console.log(compressedImage);
                    setFile(compressedImage);
                  })
                  .catch((error) => {
                    console.error('이미지 압축 오류:', error);
                  });
            } else {
            setFile(fileBlob);
            }

            return new Promise((resolve) => {
                reader.onload = () => {
                    setImageSrc(reader.result);
                    resolve();
                };
            });
        }
    };

    return(
        <div className={styles.background4}>
            <form onSubmit={onSubmitHandler} encType="multipart/form-data">
                <div className={styles.signin1}>
                    <Link to="/loginpage"><div className={styles.arrow4}></div></Link>
                    <div className={styles.pagetitle1}>회원가입</div>
                </div>
                <div className={styles.nicknametitle}>마지막이에요 <br/> 프로필을 만들어주세요</div>
                <div className={styles.circle}>
                    <label htmlFor="camera1" className={styles.camera}>
                        {
                            imageSrc ? imageSrc && <img loading="lazy" src={imageSrc} alt="preview-img" className={styles.imgtag}/> :
                            <img loading="lazy" src={cameram} className={styles.camera2}></img>
                        }
                            
                    </label>
                    <input type="file" id="camera1" accept="image/*" onChange={(e) => {encodeFileToBase64(e.target.files[0]);}}></input>
            </div>
                <div className={styles.nick}>
                    <input className={styles.nickname} onChange={saveNickname} type='text' placeholder='닉네임을 적어주세요' minLength={1} maxLength="8" required></input>
                </div>
                <div className={styles.samenickname} onClick={checkDup}>중복확인</div>
                  
                <div className={styles.buttonarea2}>
                    {
                        Isnickname && IsNotdup ? disableBtn ? <button type='button' className={styles.button4}>가입중...</button> : <button type='submit' value="계속하기" className={styles.button4}>시작하기</button>
                        :<div><div type='button' className={styles.button5} >시작하기</div></div>
                    }
                </div>
            </form>
        </div> 
    );
}

export default App;