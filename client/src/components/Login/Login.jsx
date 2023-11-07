import React from "react";
import styles from "./Login.module.css";

const Login=()=>{
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>¿Gonza?</h1>
            <div className={styles.password}></div>
            <label>Contraseña: </label>
            <input type="password" /> 
            <button>Entrar</button>   
        </div>
    )
}

export default Login;