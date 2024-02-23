import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {logIn} from '../../redux/actions/userActions';
import styles from "./LogIn.module.css";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LogIn=()=>{
    const[input,setInput]=useState({password:""});
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setInput({password:e.target.value});
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        //despacho la action para iniciar sesion  
        //uso await para que termine antes de verificar el localStorage
        await dispatch(logIn(input));
    
        !JSON.parse(localStorage.getItem("isLogged"))
            ?swal.fire({
                title:"Contraseña incorrecta",
                icon:'error',
                timer:2000,
                showConfirmButton:false,
                iconColor:'#888888'
            })
            : navigate("/Admin/Panel");

    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.title}>¿Gonza?</h1>
            <div className={styles.password}></div>
            <label>Contraseña: </label>
            <input type="password" onChange={handleChange}/>
            <button className={styles.button}>Entrar</button>   
        </form>
    )
}

export default LogIn;