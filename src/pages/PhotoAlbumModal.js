import styles from "./PhotoAlbumModal.module.css";
// import PhotoAlbum from "./PhotoAlbum";

function App() {

  const onCancel = (e) => {
    
   }


 return (
  <div className={styles.Modal}>
    <div className={styles.ModalBackground}></div>
    <div className={styles.inviteAria}>
      <div className={styles.nav}>
        {/* <div onClick={()=>{setModal(!modal)}}>취소</div> */}
        <div>사진첩 이름</div>
        <div>다음</div>
      </div>
    </div>
  </div>
 )
}


 
 

export default App;
