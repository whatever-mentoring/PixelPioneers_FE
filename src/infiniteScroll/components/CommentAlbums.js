import React from "react";
import "./Comment.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Comment({ mesureRef, comment, commentType }) {
  const [imgUrl, setImgUrl] = useState(comment.image);
  const [classType, setClassType] = useState(commentType);
  const navigate = useNavigate();

  const openAlbum = () => {
    navigate('/folder', {state:{
      id : comment.id,
      name : comment.name,
      img : comment.image
    }})
  }

  return (
    <div className="eachRandomPhoto">
      <img loading="lazy" className={classType} ref={mesureRef} src={imgUrl} onClick={openAlbum}></img>
      <div>{comment.name}</div>
    </div>
  );
}
