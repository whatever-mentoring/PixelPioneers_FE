import {useState, usetate} from 'react';
import styles from './css/folderModal2.module.css';
import { Link } from 'react-router-dom';
import FolderModal from "./folderModal";
import FolderModal3 from "./folderModal3";
import FolderModal4 from "./folderModal4";
function App(props){
    //props.albumId props.albumName props.albumImg
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);

    const modalState2 = () =>{
        setModal2(!modal2)
    }

    const modalState3 = () =>{
        setModal3(!modal3)
    }
    const modalState4 = () =>{
        setModal4(!modal4)
    }
    return(
        <div className={styles.background6}>
            <div className={styles.background7} onClick={props.modalState}></div>
            <div className={styles.controler}></div>
            <div className={styles.background8}>
            { modal2 ? <FolderModal modalState2={modalState2} albumId={props.albumId}/> : null}
            { modal3 ? <FolderModal3 modalState3={modalState3} albumId={props.albumId}/> :null}
            { modal4 ? <FolderModal4 modalState4={modalState4} albumId={props.albumId} albumName={props.albumName} albumImg={props.albumImg}/>: null}
                 <div onClick={() => {modalState3()}}>
                    <div className={styles.membermanage1}>멤버 관리</div>
                    <div className={styles.arrow4}></div>
                </div>
                <div onClick={modalState4}>
                    <div className={styles.membermanage3}>사진첩 수정</div>
                    <div className={styles.arrow5}></div>
                </div>
                <div onClick={modalState2}>
                    <div className={styles.membermanage4} >사진첩에서 나가기</div>
                    <div className={styles.goout}></div>
                </div>
        
            </div>
        </div>
    );
}
export default App;