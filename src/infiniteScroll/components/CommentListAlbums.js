import React, { useEffect } from "react";
import useOnScreen from "../hooks/useOnScreen";
import Comment from "./CommentAlbums";
import "./CommentList.css";

export default function CommentList({
  heightOfComponent,
  headerComponent,
  hasMore,
  isLoading,
  loadMore,
  comments,
  commentType
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
      <div>{headerComponent}</div>
      {comments.map((comment, index) => {
        if (index === comments.length - 1) {
          return (
            <Comment
              mesureRef={measureRef}
              key={comment.index}
              comment={comment}
              commentType={commentType}
            />
          );
        }
        return <Comment key={comment.index} comment={comment} commentType={commentType}/>;
      })}
      {isLoading && <li>Loading...</li>}
    </div>
  );
}
