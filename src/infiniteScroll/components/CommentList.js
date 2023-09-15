import React, { useEffect } from "react";
import useOnScreen from "../hooks/useOnScreen";
import Comment from "./Comment";
import "./CommentList.css";

export default function CommentList({
  heightOfComponet,
  headerComponet,
  hasMore,
  isLoading,
  loadMore,
  comments,
}) {
  const { measureRef, isIntersecting, observer } = useOnScreen();

  useEffect(() => {
    if (isIntersecting && hasMore) {
      loadMore();
      observer.disconnect();
    }
  }, [isIntersecting, hasMore, loadMore]);

  return (
    <div className="comment-list" style={{height:heightOfComponet}}>
      <div>{headerComponet}</div>
      {comments.map((comment, index) => {
        if (index === comments.length - 1) {
          return (
            <Comment
              mesureRef={measureRef}
              key={comment.index}
              comment={comment}
            />
          );
        }
        return <Comment key={comment.index} comment={comment} />;
      })}
      {isLoading && <li>Loading...</li>}
    </div>
  );
}
