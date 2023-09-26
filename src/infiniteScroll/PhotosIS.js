import React, { useCallback, useEffect, useState } from "react";
import { API } from "./utils/constants";
import CommentList from "./components/CommentListPhotos";
import { useNavigate } from "react-router-dom";

export default function App(props) {
  // props.api, props.heightOfComponet, props.headerComponet

  const [requsetType, setRequsetType] = useState("PHOTOS/"+props.albumId);
  const [page, setPage] = useState(API.startPage);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fail, setFail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //console.log("?");
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
    <div className="photosApp" style={{width:'100%', marginTop:'6vh'}}>
      {props.headerComponent}
      {comments.length >= 0 && (
        <CommentList
          heightOfComponent={props.heightOfComponent} 
          headerComponet={props.headerComponet} 
          hasMore={hasMore} 
          isLoading={isLoading} 
          loadMore={loadMore} 
          comments={comments}
          commentType={requsetType} 
          albumId={props.albumId}
          modalState1 = {props.modalState1}
        />
      )}
    </div>
  );
}
