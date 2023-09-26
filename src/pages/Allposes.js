import styles from "./css/AllPoses.module.css";
import styled from "styled-components";
import {
  React,
  useState,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SelectPeopleModal from "./recircleComponets/SelectPeopleModal";
import AllposesContent from "./recircleComponets/AllposesContent";

const TabMenu = styled.div`  
  color: black;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top:2vh;
  padding-bottom: 2vh;
  justify-content: space-between;
  list-style: none;
  width: 100%;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    text-align : center;
    padding: 1vh 1.5vh;
    border-radius : 5vh;
    font-size: 1.7vh;
    font-family: 'Pretendard-ExtraLight';
    transition : 0.5s;
    margin-left : 0.5vh
  }

  .focused {
    color:white;
    background-color : #1C66FD;
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
  }

  span{
    display : flex;
    margin-left :2vh;
  }

`;

const MainPage = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, clickTab] = useState(0);
  const [people, setPeople] = useState(location.state != null ? location.state.people : 1);
  const [modal, setModal] = useState(false);

  const modalState = () => {
    setModal(!modal);
  }

  // const menuArr = [
  //   { name: "추천", content: <Tap1 currentTab={currentTab} api={props.api}/> },
  //   { name: "스페셜", content: <Tap2 currentTab={currentTab} api={props.api}/> },
  // ];

  // const selectMenuHandler = (index) => {
  //   // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
  //   // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
  //   if(index == 0){
  //     sessionStorage.setItem('category', 'ROLE_ADMIN');
  //   } else {
  //     sessionStorage.setItem('category', 'ROLE_USER');
  //   }
    
  //   clickTab(index);
  // };

  useEffect(() =>{
    sessionStorage.setItem('category', 'ROLE_ADMIN');
  },[])
  
//   const getAlbums = (event) => {
//     event.preventDefault();

//     if(token == "") {
//         //console.log("토큰이 비었습니다.")
//     } else {
//         client.defaults.headers.common['Authorization'] = token;
//     }
    

//     //console.log(token);

//     client.get('/albums')
//         .then(function (response){
//             //console.log(response);
//         })
//         .catch(function (error) {
//             //console.log(error.response.data.error.message);
//         });
//   }

  return (
    <div className={styles.App}>
      { modal == true ? <SelectPeopleModal modalState={modalState} /> : null } {/* modal 인터페이스 */}
       <div className={styles.topNav}>
          <div style={{display:'flex', width:'50%', marginTop:'8vh'}}>
            <div className={styles.backBtn} onClick={() => navigate(-1)}></div>
            <div className={styles.pageTite}>포즈 모아보기</div>
          </div>
          <div className={styles.bookMark} onClick={()=>{alert("구현 중입니다.")}}></div>
        </div>
        {/* <TabMenu>
          <span>
          {menuArr.map((el, index) => (
            <div key={index} className={index === currentTab ? "submenu focused" : "submenu"}
              onClick={() => selectMenuHandler(index)}>
                {el.name}
            </div>
          ))}
          </span>
          <div className={styles.selectPeople} onClick={modalState}>인원수▾</div>
        </TabMenu>
        <div className={currentTab == 0 ? styles.borderL : styles.borderR}></div>
      {menuArr[currentTab].content} */}
      <AllposesContent api={props.api} height={'76vh'}/>
    </div>
  );
};

export default MainPage;

/*
const Tap1 = (props) => {
  sessionStorage.setItem('category', 'ROLE_ADMIN'); // Tap1 이 로드될 때 category를 초기화
  const [Tap1headerComponet, setTap1headerComponet] = useState(); // 탭1의 header를 커스텀하는 변수
  
  return(
    <div className={stylesTap1.Tap1}>
      <InfiniteScroll api={props.api} heightOfComponet={'76vh'} headerComponet={Tap1headerComponet}/>
    </div>
  )
}

const Tap2 = (props) => {
  const [Tap2headerComponet, setTap2headerComponet] = useState();

  return(
    <div className={styles.Tap2}>
      <InfiniteScroll api={props.api} heightOfComponet={'76vh'} headerComponet={Tap2headerComponet}/>
    </div>
  )
}
*/
