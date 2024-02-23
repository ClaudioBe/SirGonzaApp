import React, { useEffect, useRef, useState } from "react";
import styles from "./Haircut.module.css";

const Haircut=({type,images})=>{
    const [currentIndex,setCurrentIndex]=useState(0);
    const [selectedImage,setSelectedImage]=useState(images[0]);

    const prev=()=>{
        const next= currentIndex>0?currentIndex-1:currentIndex;
        setCurrentIndex(next) 
        setSelectedImage(images[next]);
    }

    const next=()=>{
        const next=currentIndex<images.length-1?currentIndex+1:currentIndex;
        setCurrentIndex(next);
        setSelectedImage(images[next]);
    }

    return (
        <div className={styles.container}>
            <button className={styles.leftArrow} onClick={prev}>{'<'}</button>
            <button className={styles.rightArrow} onClick={next}>{'>'}</button>
            <img className={styles.image} src={selectedImage} alt="" />
        </div>
    )
}

export default Haircut;