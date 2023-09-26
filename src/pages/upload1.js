import styles from "./css/upload2.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import plus from "../resource/plus.png";
import client from "../client";
import imageCompression from "browser-image-compression";

function App(props) {
    //props.albumId
    const [albumId, setAlbumId] = useState(props.albumId); // id
    const [photoTitle, setphotoTitle] = useState(); // name
    const [numValue, setValue] = useState(); // peopleCount
    const [date, setDate] = useState(""); // created_at
    const [open, setOpen] = useState(false); // open

    const [imageSrc, setImageSrc] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);
    const [file, setFile] = useState(null);
    const formData = new FormData();
    const navigate = useNavigate();
    const MAX_VALUE = 20;
    const MIN_VALUE = 1;

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

    const handleNumChange = (event) => {
      if(event.target.value == "")  {
        setValue(event.target.value);
        return;
      }
      const newValue = parseInt(event.target.value);
      if (newValue > MAX_VALUE) {
      setValue(MAX_VALUE);
      } else if (newValue < MIN_VALUE) {
      setValue(MIN_VALUE);
      } else {
      setValue(newValue);
      }
    };

    const handleDateChange = (event) => {
      setDate(event.target.value);
    }

    const handleOptionChange = (event) => {
      setOpen(!open);
    }

    
    async function onSubmitHandler(event){
        event.preventDefault();
        setDisableBtn(true);

        const inputs = {
            "id" : albumId,
            "name" : photoTitle,
            "peopleCount" : numValue,
            "created_at" : date,
            "open" : open
        }
        const joinData = new Blob([JSON.stringify(inputs)], { type: "application/json" });

        formData.append('requestDTO', joinData);
        formData.append('file', file);
        
        await client.post('/albums/' + albumId + '/photos', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(function (response) {
                //console.log(response);
                alert("사진 1장을 업로드하였습니다.");
                props.modalState1();
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
      <div className={styles.App1}></div>
      <div className={styles.App2}>
        <div className={styles.controler}></div>
        <div className={styles.close} onClick={props.modalState1}></div>
        <form onSubmit={onSubmitHandler}>
        <div className={styles.box6}>
          <p className={styles.addname}>사진 추가하기</p>
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
                required
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
          <div className={styles.name}>
            <div>제목</div>
            <div>인원 수</div> 
          </div>
          <div className={styles.box7}>
            <input
              type="text"
              className={styles.text}
              value={photoTitle}
              onChange={handleTitleChange}
              placeholder="ex.수용이와 석진이"
              required
            ></input>
            <div>
              <input
                type="number"
                className={styles.number}
                value={numValue}
                placeholder="1~20"
                min="1"
                max="20"
                onChange={handleNumChange}
                required
              ></input>
            </div>
          </div>
          <p className={styles.name1} >날짜</p>
          <div className={styles.box7}>
            <input type="date" className={styles.date} value={date} onChange={handleDateChange} required></input>
          </div>
          <div className={styles.name3} >사진 공개하기
            <label className={styles.switch}>
              <input type="checkbox" onChange={handleOptionChange}/>
              <span className={styles.slider}></span>
            </label>
          </div>

        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          {
            disableBtn ? 
            <div className={styles.addpicture}>사진 추가 중..</div> : 
            <input type="submit" value={"사진 추가하기"} className={styles.addpicture}></input>
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