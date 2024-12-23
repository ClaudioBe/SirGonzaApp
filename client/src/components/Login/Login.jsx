import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import {logIn} from '../../redux/actions/userActions';
import styles from "./LogIn.module.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
const LogIn=()=>{
    const[input,setInput]=useState({userName:"",password:""});
    const [errors,setErrors]=useState({})
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        //despacho la action para iniciar sesion  
        //si hay errores los guardo en el estado local
        try {
            //uso await para que eespere a que se resuelva la promesa
            await dispatch(logIn(input))
            navigate("/Perfil")
        } catch (error) {
            swal.fire({
                title:"Hay errores!",
                icon: 'error',
                timer:1000,
                showConfirmButton:false,
                iconColor:'red'
            }) 
            setErrors(error);
        }
    }

    return (
        <div className={styles.container}>
           <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Iniciar Sesion</h1>
                <div>
                    <label>Nombre de usuario</label>
                    <input type="text" name="userName" onChange={handleChange}/>
                </div>
                <p>{errors.userName}</p>
                
                <div>
                    <label>Contraseña</label>
                    <input type="password" name="password" onChange={handleChange}/>
                </div>
                <p>{errors.password}</p>
                
                <button type="submit">Ingresar</button>
                <button type="button" onClick={()=>navigate("/Registrarse")}>Registrarse</button>
            </form> 
        </div>    
    )
}

export default LogIn;