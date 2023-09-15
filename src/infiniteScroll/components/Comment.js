import React from "react";
import "./Comment.css";

export default function Comment({ mesureRef, comment }) {
  return (
    <div className="eachRandomPhoto">
      <li className="comment-item" ref={mesureRef}>
        <span>
          [{comment.id}] {comment.email}
        </span>
        <p>{comment.body}</p>
      </li>
      <div className="randomPhotoTitle">{comment.id}번 사진</div>
    </div>
  );
}
