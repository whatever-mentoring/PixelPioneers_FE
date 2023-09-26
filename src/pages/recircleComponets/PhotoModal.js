import styled from "./css/PhotoModal.module.css";
import { useState,useEffect } from "react";
import client from "../../client";

const PhotoModal = (props) => {

    const [imgUrl, setImgUrl] = useState("");
    const [top, setTop] = useState(100);

    useEffect(()=>{
        client.get('/poses/random?peopleCount='+sessionStorage.getItem('people'))
        .then(function(res) {
            setImgUrl(res.data.response.image);
            setTop(15);
        })
        .catch(function(err) {
            //console.log(err);
            props.modalState();
        }).finally(function() {

        });
    }, [])

    return(
      <div className={styled.modal}>
        <div className={styled.ModalBackground} onClick={props.modalState}></div>
        <div className={styled.ModalArea} style={{top : top+'vh'}}>
            <div className={styled.script}>이런 포즈 어때요?</div>
            <div className={styled.imageArea}>
                <img loading="lazy" className={styled.image} src={imgUrl}></img>
            </div>
          <button className={styled.close} onClick={props.modalState}>닫기</button>
        </div>
      </div>
    );
}

export default PhotoModal;


