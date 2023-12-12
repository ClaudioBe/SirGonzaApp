import React, { useEffect, useState } from "react";
import styles from "./Haircut.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getHaircutTypeById } from "../../redux/actions";

const Haircut=({TypeId,image})=>{
    const dispatch=useDispatch();
    useEffect(()=>{dispatch(getHaircutTypeById(TypeId))},[dispatch,TypeId]);
    const type=useSelector(state=>state.haircutType);
    return (
        <div className={styles.container}>
            <img src={image} alt=""/>
            <p>Corte: {type.name}</p>
        </div>
    )
}

export default Haircut;