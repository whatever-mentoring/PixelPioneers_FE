import React, { useCallback, useEffect, useState } from "react";
import { API } from "./utils/constants";
import CommentList from "./components/CommentListAlbums";
import { useNavigate } from "react-router-dom";


export default function App(props) {
  // props.api, props.heightOfComponet, props.headerComponet
  
  const [requsetType, setRequsetType] = useState("ALBUMS");
  const [page, setPage] = useState(API.startPage);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fail, setFail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // //console.log(people);
    // //console.log(category);
    (async () => {
      const { data: newComments } = await props.api.comments(requsetType, page, "", "");
      setComments((prevComments) => [...prevComments, ...newComments.response]);
      setHasMore(newComments.response.length > 0);
      setIsLoading(false);
    })();
  }, [props.api, page]);

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
    setIsLoading(true);
  }, []);

  return (
    <div className="app" style={{width:'100%'}}>
      {props.headerComponent}
      {comments.length > 0 && (
        <CommentList
          heightOfComponent={props.heightOfComponent} 
          headerComponet={props.headerComponet} 
          hasMore={hasMore} 
          isLoading={isLoading} 
          loadMore={loadMore} 
          comments={comments}
          commentType={requsetType} 
        />
      )}
    </div>
  );
}
