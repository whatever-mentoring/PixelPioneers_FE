import styles from "./css/AllPoses.module.css";
import stylesTap1 from "./css/AllPosesTap1.module.css";
import styled from "styled-components";
import {
  React,
  useState,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "../../infiniteScroll/InfiniteScroll"
import SelectPeopleModal from "./../recircleComponets/SelectPeopleModal";

const TabMenu = styled.div`  
  
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top:2vh;
  padding-bottom: 2vh;
  justify-content: space-between;
  list-style: none;
  width: 100%;
  background-color:white;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    text-align : center;
    padding: 1vh 1.5vh;
    border-radius : 5vh;
    font-size: 1.7vh;
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

const App = (props) => {
    // api={props.api} heightOfComponet={props.height}
    // location.state.people

    const location = useLocation();
    const [currentTab, clickTab] = useState(0);
    const [modal, setModal] = useState(false);
    const [init, setInit] = useState(true);

    const modalState = () => {
      setInit(false);
      setModal(!modal);
    }

    const menuArr = [
        { name: "추천", content: <Tap1 currentTab={currentTab} api={props.api} height={props.height}/> },
        { name: "스페셜", content: <Tap2 currentTab={currentTab} api={props.api} height={props.height}/> },
    ];

    const selectMenuHandler = (index) => {
        // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
        // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
        if(index == 0){
          sessionStorage.setItem('category', 'ROLE_ADMIN');
        } else {
          sessionStorage.setItem('category', 'ROLE_USER');
        }
        
        clickTab(index);
    }
    
    // useEffect(() =>{
    //     sessionStorage.setItem('category', 'ROLE_ADMIN');
    //     sessionStorage.setItem('people', location.state == null ? 1 : location.state.Tap == 1 ? 1 : location.state.people);
    //     console.log("reloaded");
    // },[]);

    return (
        <div className={styles.App} style={{backgroundColor:'rgba(243, 243, 243, 0.9)', width: '100%'}}>
            { modal == true ? <SelectPeopleModal modalState={modalState} /> : null } {/* modal 인터페이스 */}
            <TabMenu>
                <span>
                {menuArr.map((el, index) => (
                <div key={index} className={index === currentTab ? "submenu focused" : "submenu"}
                    onClick={() => selectMenuHandler(index)}>
                    {el.name}
                </div>
                ))}
                </span>
                <div className={styles.selectPeople} onClick={modalState}>{ sessionStorage.getItem('people') === undefined || init ? '인원수 ▾' : "#"+sessionStorage.getItem('people')+"명이서" }</div>
            </TabMenu>
            <div className={currentTab == 0 ? styles.borderL : styles.borderR}></div>
            {menuArr[currentTab].content}
        </div>
    );
};
    


const Tap1 = (props) => {
    sessionStorage.setItem('category', 'ROLE_ADMIN'); // Tap1 이 로드될 때 category를 초기화
    const [Tap1headerComponet, setTap1headerComponet] = useState(); // 탭1의 header를 커스텀하는 변수
    
    return(
      <div className={stylesTap1.Tap1}>
        <InfiniteScroll api={props.api} heightOfComponent={props.height} headerComponent={Tap1headerComponet}/>
      </div>
    )
  }
  
const Tap2 = (props) => {
    const [Tap2headerComponet, setTap2headerComponet] = useState();
  
    return( 
      <div className={styles.Tap2}>
        <InfiniteScroll api={props.api} heightOfComponent={props.height} headerComponent={Tap2headerComponet}/>
      </div>
    )
}

export default App;