import styles from "./css/folderModal3_invite.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../client";

const Invite = (props) => {
    //props.albumId props.modalState props.oldMembersList

    const idInputRef = useRef(null);
    const navigate = useNavigate();
    const [albumTitle, setalbumTitle] = useState(''); // input에 입력된 albumTitle 저장
    const [userID, setUserID] = useState(''); // input에 입력된 userID 저장
    const [userList, setUserList] = useState([]);
    const [userListFilter, setUserListFilter] = useState([]);
    const [userIdList, setUserIdList] = useState([]);
    client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');

    const idInputFocus = () => {
      idInputRef.current.focus();
    };

    useEffect(() => {
      idInputFocus();
    }, []);

    const saveUserID = async (event) => { //userId 값이 입력되는 동시에 실시간으로 userId를 서버로부터 검색
      setUserID(event.target.value);
  
      if(event.target.value != ""){
        await client.get('/users?nickname=' + event.target.value)
          .then(function(response){
            setUserListFilter(response.data.response);
          }).catch(function(error){
            //console.log(error);
            alert('로그인 세션 만료. 다시 로그인 해주세요.');
            navigate('/onboard');
          });
      } else {
        setUserListFilter([]);
      }
    }

    // userId 리스트에 요소 추가
    const pushBackToUserList = (value) => {  
      for(let i = 0; i < props.oldMembersList.length; i++){
        if(value.id == props.oldMembersList[i]){
          alert(value.nickname + "님은 이 앨범의 멤버입니다.");
          return;
        }
      }
      if(userList.find(v => v.id == value.id) != null){
        alert("이미 추가된 멤버입니다.");
      } else {
        //console.log("추가");
        setUserList([...userList, value]);
        setUserIdList([...userIdList, value.id]);
        setUserID('');
        idInputFocus();
        setUserListFilter([]);
        //console.log(userIdList);
      }
    }

    return (
        <div className={styles.Modal}>
          <div className={styles.ModalBackground}></div>
          <div className={styles.inviteAria}>
            <div className={styles.nav}>
            <div onClick={props.modalState}>취소</div>
            <div onClick={() => idInputFocus()} style={{fontSize:'2.2vh'}}>초대하기</div>
            <GenarateBtn albumId={props.albumId} userIdList={userIdList} modalState={props.modalState}/>

          </div>
          <div className={styles.inputUserIdArea}>
            친구 아이디 : &nbsp;
            {userList.map((userList, index) => <span key={index} style={{color:"black"}}>{userList.nickname}&nbsp;</span>)}
            <input ref={idInputRef} onChange={saveUserID} value={userID} type="text" maxLength={12} className={styles.inputUserId}></input>
          </div>
          <div className={styles.filterUsers}>
            {userListFilter.map((userListFilter, index) => <div className={styles.filterUser} key={index} onClick={() => pushBackToUserList(userListFilter)}><img loading="lazy" src={userListFilter.image}></img>{userListFilter.nickname}</div>)}
          </div>
        </div>
      </div>
    )
}

export default Invite;


function GenarateBtn(props) { // input의 조건을 검사하여 일치할 시 활성화 된 '추가' 버튼 return
  //props.userIdList
  const onGenarateHandler = (event) =>{
    //console.log(props.userIdList);
    const input = {
      "userIdList" : props.userIdList
    }

    client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
    client.post('/albums/'+props.albumId+'/members/', input)
    .then(function(response){
      //console.log(response);
      alert("새 멤버를 추가했어요!");
      props.modalState();
    })
    .catch(function(error){
      //console.log(error);
      alert("추가 실패..");
      props.modalState();
    });
  }
  if(props.userIdList.length > 0){ // userId의 조건 검사  
    return <div style={{color:'#113C7E'}} onClick={onGenarateHandler}>추가</div> // 활성화됨
  } else {
    return <div style={{color:'#B7B6B4'}}>추가</div> // 비활성화
  }
}