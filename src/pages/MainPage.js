import styles from "./css/MainPage.module.css";
import stylesTap1 from "./css/MainPageTap1.module.css";
import stylesTap2 from "./css/MainPageTap2.module.css";
import styled from "styled-components";
import {
  React,
  useState,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from './recircleComponets/Wrapper';
import InfiniteScroll from "../infiniteScroll/InfiniteScroll"
import { Link } from 'react-router-dom';
import PhotoAlbumModal from "./PhotoAlbumModal";
import OnBoard from "../login/OnBoard";
import decodeJWT from "../decodeJWT";
import client from "../client"
import AllposesContent from "./recircleComponets/AllposesContent";
import AlbumsIS from "../infiniteScroll/AlbumsIS";
import LogoImg from "../resource/img/logo.png"
import PhotoModal from "./recircleComponets/PhotoModal";

const TabMenu = styled.div`  
  color: black;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  width: 100%;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현

    text-align: center;
    width: calc(100% / 2);
    padding: 2vh;
    font-size: 1.7vh;
    border-bottom: 0.1vh solid white;
    font-size: 2.2vh;
    
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
  }

`;

const MainPage = (props) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  useEffect(()=>{
    client.defaults.headers.common['Authorization'] = token;
    client.get('/users?nickname=asdf')
    .then(function(res) {
      //console.log("로그인 인증 성공");
      setIsLogin(true);
      sessionStorage.setItem('category', 'ROLE_ADMIN');
    }).catch(function(err){
      if(err.response.status == "401"){
        alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        sessionStorage.clear();
        client.defaults.headers.common['Authorization'] = undefined;
        setIsLogin(false);
        navigate('/onBoard');
      } else {
        setIsLogin(true);
      }
      //console.log(err);
    });
  }, []);

  const location = useLocation();
  
  const [currentTab, clickTab] = useState(location.state!=null?location.state.Tap:0);

  //console.log(decodeJWT.parseJwt(token));

  const menuArr = [
    { name: "포즈보기", content: <Tap1 currentTab={currentTab} api={props.api}/> },
    { name: "사진첩", content: <Tap2 currentTab={currentTab} api={props.api}/> },
  ];

  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };

  if(isLogin){
    return (
      <div className={styles.App}>
          <div className={styles.topNav}>
            <div className={styles.logo}></div>
            <img loading="lazy" className={styles.userIcon} src={sessionStorage.getItem('image')} onClick={()=>navigate('/mypage')}></img>
          </div>
          <TabMenu>
            {/*아래 하드코딩된 내용 대신에, map을 이용한 반복으로 코드를 수정
              li 엘리먼트의 class명의 경우 선택된 tab 은 'submenu focused', 나머지 2개의 tab은 'submenu' 
              <li className="submenu">{menuArr[0].name}</li>
              <li className="submenu">{menuArr[1].name}</li>
              <li className="submenu">{menuArr[2].name}</li> */}
            {menuArr.map((el, index) => (
              <div key={index} className={index === currentTab ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}>
                  {el.name}
              </div>
            ))}
          </TabMenu>
          <div className={currentTab == 0 ? styles.borderL : styles.borderR}></div>
        {menuArr[currentTab].content}
      </div>
    );
  } else {
    return(
      <div className={styles.Loading}>
        <img loading="lazy" src={LogoImg}></img>
      </div>
    );
  }
};

export default MainPage;

const Tap1 = (props) => {
  const [Tap1headerComponet, setTap1headerComponet] = useState(
    <div className={stylesTap1.tap1Header}>
      <div className={stylesTap1.tap1HeaderTotal}>총 00개</div>
      <div className={stylesTap1.tap1HeaderPeople}>인원수▾</div>
    </div>
  );

  const [modal1, setModal1] = useState(false);

  const modalState = () => {
    setModal1(!modal1);
  }
  
  
  return(
    <div className={stylesTap1.Tap1}>
      {modal1 ? <PhotoModal modalState={modalState} modal={modal1}/>: null}
      <div className={stylesTap1.Banner} onClick={modalState}>
        <div>
          <div className={stylesTap1.BannerDiv1}>무슨 포즈할 지 고민될 때는?</div>
          <div className={stylesTap1.BannerDiv2}>랜덤 포즈 뽑기</div>
        </div>
        <div className={stylesTap1.BannerImg}></div>
      </div>
      {/* <InfiniteScroll api={props.api} heightOfComponet={'66vh'} headerComponet={Tap1headerComponet}/> */}
      <AllposesContent api={props.api} height='57.5vh'/>
    </div>
  )
}

const Tap2 = (props) => {
  const [Tap2headerComponent, setTap2headerComponent] = useState(
    <div className={stylesTap2.tap2Header}>
      <div className={stylesTap2.tap2HeaderTitle}>{sessionStorage.getItem("nickname")}님의 추억</div>
    </div>
  );

  // //console.log(decodeJWT.parseJwt(sessionStorage.getItem('token')));

  const [modal, setModal] = useState(false);

  const modalState = () => {
    setModal(!modal);
  }

  return(
    <div className={stylesTap2.Tap2}>
      { modal == true ? <PhotoAlbumModal modalState={modalState} /> : null } {/* modal 인터페이스 */}
      <AlbumsIS api={props.api} heightOfComponent={'73.5vh'} headerComponent={Tap2headerComponent}/>
      <div className={stylesTap2.createAlbum} onClick={()=>{setModal(!modal)}}></div>
    </div>
  )
}
