import styled from "./PlusBtn.module.css";

function plusBtn(props) {
    return (
        <div className={styled.plusBtn} onClick={props.modalState1}></div>
    )
}

export default plusBtn;