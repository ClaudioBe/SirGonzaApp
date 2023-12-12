import React, { useState } from "react";
import styles from "./Login.module.css";

const Login=()=>{
    const[input,setInput]=useState('');

    const handleChange=(e)=>{
        setInput(...input,e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        //despachar action para iniciar sesion  
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

export default Login;