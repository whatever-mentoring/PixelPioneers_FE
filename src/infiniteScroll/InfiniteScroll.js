import React, { useCallback, useEffect, useState } from "react";
import { API } from "./utils/constants";
import CommentList from "./components/CommentList";
  
export default function App(props) {
  const [page, setPage] = useState(API.startPage);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(comments.length);
    (async () => {
      const { data: newComments } = await props.api.comments(page);
      setComments((prevComments) => [...prevComments, ...newComments]);
      setHasMore(newComments.length > 0);
      setIsLoading(false);
    })();
  }, [props.api, page]);

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
    setIsLoading(true);
  }, []);

  return (
    <div className="app">
      {comments.length > 0 && (
        <CommentList
          heightOfComponet={props.heightOfComponet} 
          headerComponet={props.headerComponet} 
          hasMore={hasMore} 
          isLoading={isLoading} 
          loadMore={loadMore} 
          comments={comments} 
        />
      )}
    </div>
  );
}
