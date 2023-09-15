import styles from "./css/MainPage.module.css";
import stylesTap1 from "./css/MainPageTap1.module.css";
import stylesTap2 from "./css/MainPageTap2.module.css";
import styled from "styled-components";
import {
  React,
  useState,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";
import Wrapper from './recircleComponets/Wrapper';
import InfiniteScroll from "../infiniteScroll/InfiniteScroll"
import { Link } from 'react-router-dom';
import PhotoAlbumModal from "./PhotoAlbumModal";


const TabMenu = styled.div`  
  color: white;
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
    font-family: 'Pretendard-ExtraLight';
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
  }

`;

const MainPage = (props) => {
  const location = useLocation();
  const [currentTab, clickTab] = useState(location.state!=null?location.state.Tap:0);

  const menuArr = [
    { name: "랜덤포즈뽑기", content: <Tap1 currentTab={currentTab} api={props.api}/> },
    { name: "사진첩", content: <Tap2 currentTab={currentTab} api={props.api}/> },
  ];

  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };

  return (
    <div className={styles.App}>
        <div className={styles.topNav}>
          <div className={styles.logo}></div>
          <div className={styles.userIcon}></div>
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
};

export default MainPage;

const Tap1 = (props) => {
  const [Tap1headerComponet, setTap1headerComponet] = useState(
    <div className={stylesTap1.tap1Header}>
      <div className={stylesTap1.tap1HeaderTotal}>총 00개</div>
      <div className={stylesTap1.tap1HeaderPeople}>인원수▾</div>
    </div>
  );
  
  return(
    <div className={stylesTap1.Tap1}>
      <div className={stylesTap1.Banner}>
        <div>
          <div className={stylesTap1.BannerDiv1}>무슨 포즈할 지 고민될 때는?</div>
          <div className={stylesTap1.BannerDiv2}>랜덤포즈뽑기</div>
        </div>
        <div className={stylesTap1.BannerImg}></div>
      </div>
      <InfiniteScroll api={props.api} heightOfComponet={'66vh'} headerComponet={Tap1headerComponet}/>
    </div>
  )
}

const Tap2 = (props) => {
  const [Tap2headerComponet, setTap2headerComponet] = useState(
    <div className={stylesTap2.tap2Header}>
      <div className={stylesTap2.tap2HeaderTitle}>juyeon님의 추억</div>
    </div>
  );

  const [modal, setModal] = useState(false);

  const modalState = () => {
    setModal(!modal);
  }

  return(
    <div className={styles.Tap2}>
      { modal == true ? <PhotoAlbumModal modalState={modalState} /> : null } {/* modal 인터페이스 */}
      <InfiniteScroll api={props.api} heightOfComponet={'81vh'} headerComponet={Tap2headerComponet}/>
      <div className={stylesTap2.createAlbum} onClick={()=>{setModal(!modal)}}></div>
    </div>
  )
}
