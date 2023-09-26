import styles from "./css/folderModal4.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import plus from "../resource/plus.png";
import client from "../client";
import imageCompression from "browser-image-compression";
import axios from "axios";
import useScript from "./hooks/useScript";

function App(props) {
    //props.alnumId props.albumName props.albumImg props.modalState4 

    // const [loading, error] = useScript("https://cdnjs.cloudflare.com/ajax/libs/fetch-jsonp/1.0.6/fetch-jsonp.min.js");

    const [albumId, setAlbumId] = useState(props.albumId); // id
    const [photoTitle, setphotoTitle] = useState(props.albumName); // name

    const [imageSrc, setImageSrc] = useState(props.albumImg);
    const [disableBtn, setDisableBtn] = useState(false);
    const [file, setFile] = useState(null);
    const formData = new FormData();
    const navigate = useNavigate();

    // useEffect(()=>{
    //     if(loading){
    //         //console.log("불러오는 중!")
    //     }
    //     if(!loading){
    //         //console.log("불러오기 완료!")
    //     }
    // }, [loading]);

    useEffect(()=>{
        if(file === null)
        fetch("https://cors-anywhere.herokuapp.com/"+props.albumImg)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "defult", { type: 'image/png' });
                setFile(file);
                //console.log(file)
            })
            .catch(error => {
                console.error('이미지 다운로드 중 오류 발생:', error);
            });
    }, [])

    const encodeFileToBase64 = (fileBlob) => {
        if (fileBlob != null) {
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

    const handleTitleChange = (event) => {
        setphotoTitle(event.target.value);
        if(event.target.value.length >= 12){
          setphotoTitle(event.target.value.slice(0,12));
        }
    };

    
    async function onSubmitHandler(event){
        event.preventDefault();
        setDisableBtn(true);

        const inputs = {
            "name" : photoTitle,
        }
        const joinData = new Blob([JSON.stringify(inputs)], { type: "application/json" });

        formData.append('updateDTO', joinData);
        formData.append('file', file);
        
        await client.put('/albums/' + albumId, formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(function (response) {
                console.log(response);
                alert("수정되었습니다.");
                props.modalState4();
                window.location.replace('/folder');
            })
            .catch(function (error) {
                //console.log(error);
                alert(error.response.data.error.message);
                if(error.response.status == "401"){
                    alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
                    sessionStorage.setItem('isLogin', false);
                    navigate('/onBoard');
                }
            })
            .finally(function() {
                setDisableBtn(false);
                //console.log(file);
            })
        };

  return (
    <div className={styles.App}>
      <div className={styles.App1} onClick={props.modalState4}></div>
      <div className={styles.App2}>
        <div className={styles.controler}></div>
        <div className={styles.close} onClick={props.modalState4}></div>
        <form onSubmit={onSubmitHandler}>
        <div className={styles.box6}>
          <p className={styles.addname}>사진첩 수정</p>
          <p className={styles.name}>대표 이미지</p>
          <div className={styles.box5}>
            <div className={styles.folder}>
              <label htmlFor="plus4" className={styles.folder2}>
                {imageSrc ? (
                  imageSrc && (
                    <img loading="lazy"
                      src={imageSrc}
                      alt="preview-img"
                      className={styles.imgtag}
                    />
                  )
                ) : (
                  <img loading="lazy" src={plus} className={styles.plus3}></img>
                )}
              </label>
              <input
                type="file"
                id="plus4"
                accept="image/*"
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                }}
              ></input>
            </div>
            {imageSrc ? (
              <div></div>
            ) : (
              <p className={styles.pictureupload}>사진 올리기</p>
            )}
          </div>
        </div>
        <div className={styles.block2}>
          <p className={styles.name}>제목 </p>
          <div className={styles.box7}>
            <input
              type="text"
              className={styles.text}
              value={photoTitle}
              onChange={handleTitleChange}
              placeholder="제목을 입력해주세요."
              maxLength={12}
              required
            ></input>
          </div>
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          {
            disableBtn ? 
            <div className={styles.addpicture}>수정 중..</div> : 
            <input type="submit" value={"수정하기"} className={styles.addpicture}></input>
          }
        </div>
        </form>
      </div>
    </div>
  );
}
export default App;

/* 
"Validation failed for argument [1] in public org.springframework.http.ResponseEntity<?>
 com.example.PixelPioneers.controller.PhotoRestController.
 photoAdd
 (int,com.example.PixelPioneers.DTO.PhotoRequest$PhotoAddDTO,org.springframework.web.multipart.MultipartFile,com.example.PixelPioneers.config.auth.CustomUserDetails,org.springframework.validation.Errors)
  throws java.lang.Exception: 
  [Field error in object 'requestDTO' on field 'created_at': rejected value [null];
   codes [NotNull.requestDTO.created_at,NotNull.created_at,NotNull.java.time.LocalDate,NotNull]; 
   arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [requestDTO.created_at,created_at];
    arguments []; default message [created_at]]; default message [널이어서는 안됩니다]] "
*/