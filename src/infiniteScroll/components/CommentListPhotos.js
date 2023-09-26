import React, { useEffect } from "react";
import useOnScreen from "../hooks/useOnScreen";
import Comment from "./CommentPhotos";
import "./CommentList.css";
import PlusBtn from "./PlusBtn";

export default function CommentList({
  heightOfComponent,
  headerComponent,
  hasMore,
  isLoading,
  loadMore,
  comments,
  commentType,
  modalState1,
  albumId
}) {
  const { measureRef, isIntersecting, observer } = useOnScreen();

  useEffect(() => {
    if (isIntersecting && hasMore) {
      loadMore();
      observer.disconnect();
    }
  }, [isIntersecting, hasMore, loadMore]);

  return (
    <div className="comment-list" style={{height:heightOfComponent}}>
      <PlusBtn modalState1={modalState1} />
      {comments.map((comment, index) => {
        if (index === comments.length - 1) {
          return (
            <Comment
              mesureRef={measureRef}
              key={comment.index}
              comment={comment}
              commentType={commentType}
              albumId={albumId}
            />
          );
        }
        return <Comment key={comment.index} comment={comment} commentType={commentType} albumId={albumId}/>;
      })}
      {isLoading && <li>Loading...</li>}
    </div>
  );
}
