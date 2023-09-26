import React, { useCallback, useEffect, useState } from "react";
import { API } from "./utils/constants";
import CommentList from "./components/CommentList";
import { useLocation } from "react-router-dom";


export default function App(props) {
  // props.api, props.requsetType, props.heightOfComponent, props.headerComponet
  
  const [page, setPage] = useState(API.startPage);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [commentType, setCommentType] = useState(sessionStorage.getItem('category') );
  const location = new useLocation();

  useEffect(() => {
    if(sessionStorage.getItem('people') == null){
      sessionStorage.setItem('people', 1);
    }
    if(sessionStorage.getItem('category') == null){
      sessionStorage.setItem('category', 'ROLE_ADMIN');
    }
    const people = sessionStorage.getItem('people');
    const category = sessionStorage.getItem('category');
    // //console.log(people);
    // //console.log(category);
    (async () => {
      const { data: newComments } = await props.api.comments(commentType, page, category, people);
      setComments((prevComments) => [...prevComments, ...newComments.response]);
      setHasMore(newComments.response.length > 0);
      setIsLoading(false);
    })();
  }, [props.api, page, sessionStorage.getItem('people')]);

  useEffect(() => { // 인원수 or 카테고리가 변경되면 다시 로드
    //console.log("===변경됨===");
    const people = sessionStorage.getItem('people');
    const category = sessionStorage.getItem('category');
    // console.log(people);
    // console.log(category);
    setComments("");
    setPage(0);
    setCommentType(category);
  }, [sessionStorage.getItem('people'), sessionStorage.getItem('category')])

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
    setIsLoading(true);
  }, []);

  return (
    <div className="app">
      {comments.length > 0 && (
        <CommentList 
          heightOfComponent={props.heightOfComponent} 
          headerComponent={props.headerComponent} 
          hasMore={hasMore} 
          isLoading={isLoading} 
          loadMore={loadMore} 
          comments={comments}
          commentType={commentType} 
        />
      )}
    </div>
  );
}