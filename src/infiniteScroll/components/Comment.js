import React, { useEffect } from "react";
import "./Comment.css";
import styled from "./Comment.module.css";
import { useState } from "react";

export default function Comment({ mesureRef, comment, commentType }) {
  const [imgUrl, setImgUrl] = useState(comment.image);
  const [classType, setClassType] = useState(commentType);
  const [modal, setModal] = useState(false);
  const [top, setTop] = useState(100);

  const modalState = () => {
    setModal(!modal);
  }

  useEffect(()=>{
    if(modal){
      setTop(15);
    } else {
      setTop(100);
    }
  }, [modal])

  return (
    <div className="eachRandomPhoto">
      {modal ? <PhotoModal modalState = {modalState} comment={comment} top={top}/> : null}
      <img loading="lazy" className={classType} ref={mesureRef} src={imgUrl} onClick={modalState}></img>
    </div>
  );
}


const PhotoModal = (props) => {
  return(
    <div className={styled.modal}>
      <div className={styled.ModalBackground} onClick={props.modalState}></div>
      <div className={styled.ModalArea} style={{top : props.top+'vh'}}>
        <div className={styled.imageArea}>
          <img loading="lazy" className={styled.image} src={props.comment.image}></img>
        </div>
        <button className={styled.close} onClick={props.modalState}>닫기</button>
      </div>
    </div>
  );
}