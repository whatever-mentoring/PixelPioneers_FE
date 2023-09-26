import styles from './changeprofile.module.css';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import imageCompression from "browser-image-compression";
import client from '../client';
import cameram from '../resource/cameram.png';

function App(){
    // const [userid,setuserid] = useState('');
    // setuserid("주연")
    const navigate = useNavigate();
    let goBack = () => {
        navigate(-1);
      };

    const [UserNickname,setUserNickname] = useState(sessionStorage.getItem('nickname'));
    const [file, setFile] = useState();
    const [IsNotdup,setIsNotdup] = useState(false);
    const [disableBtn , setDisableBtn] = useState(false);
    const [Isnickname, setIsnickname] = useState(false);
    const [changeFile, setChangeFile] = useState(false);
    const [imageSrc, setImageSrc] = useState(sessionStorage.getItem('image'));
    const location= useLocation();
    const formData = new FormData();
    client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');


    useEffect(()=>{
        if(file == null)
        fetch("https://cors-anywhere.herokuapp.com/"+ imageSrc)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], imageSrc.split("/").pop(), { type: 'image/png' });
                setFile(file);
                console.log(file);
            })
            .catch(error => {
                console.error('이미지 다운로드 중 오류 발생:', error);
            });
    }, [])
    
      
          
      const saveNickname = event =>{
          setUserNickname(event.target.value);
          setIsnickname(event.target.value.toLowerCase().match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,7}$/));
      }
      const checkDup = () => {
        
        const inputs = {
            "nickname" : UserNickname         
        }

        client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
        client.post('/nickname/check/', inputs)
        .then(function (response) {
            //console.log(response);
            //console.log(response.data.success);
            setIsNotdup(response.data.success);
            return true;                                                                                   
        })
        .catch(function(error){
            //console.log(error.response.data.error.status);
            if(error.response.data.error.status == "401"){
                alert("로그인 세션 만료. 다시 로그인해주세요.");
                navigate('/loginpage2');
            } else {
                //console.log(error);
                setIsNotdup(error.response.data.success);
                alert("중복된 닉네임입니다.");
                return false;
            }
        })  
    }
    async function onSubmitHandler(event){
          event.preventDefault();

          if(UserNickname != sessionStorage.getItem('nickname')){
            if(checkDup()) return;
          }
        
          //console.log(defaultImg);
          setDisableBtn(true);
  
          const inputs = {
              "nickname" : UserNickname,   
          }

          console.log(inputs);
          console.log(file);

          const joinData = new Blob([JSON.stringify(inputs)], { type: "application/json" });
  
          formData.append('updateDTO', joinData);
          formData.append('file', file);
          
          
          client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
          await client.put('/users/'+sessionStorage.getItem('id') + '/profile', formData, {headers: {'Content-Type': 'multipart/form-data'}})
          .then(function (response) {
              console.log(response);
              sessionStorage.setItem('nickname', response.data.response.nickname);
              sessionStorage.setItem('image', response.data.response.image);
              alert("정보변경 성공!");
              window.location.replace('/mypage');
          })
          .catch(function (error) {
              console.log(error);
              //alert(error.response.data.error.message);
          })
          .finally(function() {
              setDisableBtn(false);
          })
      }
  
      
  
      const encodeFileToBase64 = (fileBlob) => {
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

          setChangeFile(true);
        return new Promise((resolve) => {
          reader.onload = () => {
            setImageSrc(reader.result);
            resolve();
          };
        });
      };
    return (
        <div className={styles.background11}>
            <div className={styles.bord1}>
                <button className={styles.arrow6} onClick={goBack}/>
                <p className={styles.mypagetitle}>프로필변경</p>
            </div>
            <div className={styles.circle}>
                    <label htmlFor="camera1" className={styles.camera}>
                        {
                            imageSrc ? imageSrc && <img loading="lazy" src={imageSrc} alt="preview-img" className={styles.imgtag}/> :
                            <img loading="lazy" src={cameram} className={styles.camera2}></img>
                        }
                            
                    </label>
                    <input type="file" id="camera1" accept="image/*" onChange={(e) => {encodeFileToBase64(e.target.files[0]);}}></input>
            </div>
            <div className={styles.bord2}>
                <div className={styles.absoluteDiv}>
                    <p className={styles.title}>닉네임 변경</p>
                    <div className={styles.samenickname} onClick={checkDup}></div>
                </div>
                    <input type="text" placeholder="juyeon" className={styles.box} onChange={saveNickname} value={UserNickname}></input>
            </div>
            
            <div className={styles.buttonarea2}>
                {
                    Isnickname || changeFile ?
                        disableBtn ? <button type='button' className={styles.button4}>변경중...</button> 
                        : <button className={styles.button4} onClick={onSubmitHandler} >변경하기</button>
                    : <button type='button' className={styles.button5}>변경하기</button>
                }
            </div>
    </div>
    )
};
export default App;