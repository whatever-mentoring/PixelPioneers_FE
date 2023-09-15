import styles from "./css/selectPeopleModal.module.css";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const App = (props) => {
    const targetRef = useRef(null);  
    const handleScroll = () => {
        console.log("scrolling");
        
        if (window.scrollY > 0) {
        targetRef.current.style.position = "fixed";      
        }
    };

    useEffect(() => {    
        const timer = setInterval(() => {
        window.addEventListener("scroll", handleScroll);
        }, 100);
        return () => {
        clearInterval(timer);
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const onCancel = () => {
        props.modalState();
    }

    return(
        <div className={styles.Modal}>
            <div className={styles.ModalBackground}></div>
            <div className={styles.ModalArea} ref={targetRef}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default App;
