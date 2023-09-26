import React from "react";
import styled from "./CommentPhotos.module.css";
import modalstyled from "./modalStyle.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../client";

export default function Comment({ mesureRef, comment, commentType, albumId }) {
  const [imgUrl, setImgUrl] = useState(comment.image);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const modalState = () => {
    setModal(!modal);
  }

  // const openAlbum = () => {
  //   navigate('/', {state:{
  //     id : comment.id,
  //     name : comment.name,
  //     img : comment.image
  //   }})
  // }

  return (
    <div className="eachRandomPhoto">
      {modal ? <PhotoModal modalState = {modalState} comment={comment} albumId={albumId}/> : null}
      <img loading="lazy" className={styled.PHOTOS} ref={mesureRef} src={imgUrl} onClick={modalState}></img>
      <div className={styled.name}>{comment.name}</div>
      <div className={styled.date}>{comment.created_at}</div>
    </div>
  );
}

const PhotoModal = (props) => {
  const deletePhoto = () => {
    //console.log("/albums/"+props.albumId+"/photos/"+props.comment.id);
    if(window.confirm("정말로 삭제하시겠습니까?")){
      client.delete("/albums/"+props.albumId+"/photos/"+props.comment.id)
      .then(function(res){
        //console.log(res);
        alert("사진 1장을 삭제하였습니다.");
        window.location.replace('/folder');
      })
      .catch(function(err){
        //console.log(err);
      });
    }
  }

  return(
    <div className={modalstyled.modal}>
      <div className={modalstyled.ModalBackground} onClick={props.modalState}></div>
      <div className={modalstyled.ModalArea}>
        <div>
          <div className={modalstyled.trashCan} onClick={deletePhoto}></div>
        </div>
        <div className={modalstyled.title}>{props.comment.name}</div>
        <div className={modalstyled.date}>{props.comment.created_at}</div>
        <div className={modalstyled.imgArea}>
          <img loading="lazy" className={modalstyled.image} src={props.comment.image}></img>
        </div>
      </div>
    </div>
  )
}
