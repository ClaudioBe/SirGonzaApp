"use client"
import React, { useState } from "react";
import { useLogInMutation } from "@/redux/services/userApi";
import styles from "@/ui/LogIn.module.css";
import { useRouter } from 'next/navigation';
import swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/userSlice";

const LogIn=()=>{
    const [input,setInput]=useState({userName:"",password:""});
    const [errors,setErrors]=useState({})
 
    const[logIn]=useLogInMutation();
    const router=useRouter();
    const dispatch=useDispatch();
    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        //despacho la action para iniciar sesion  
        //si hay errores los guardo en el estado local
        try {
            //.unwrap() para poder capturar el error
            await logIn(input).unwrap().then(res=>{dispatch(setUser(res))})
            router.push("/Perfil")

        } catch (error) {     
            setErrors(JSON.parse(error.data));
            swal.fire({
                title:"Hay errores!",
                icon: 'error',
                timer:1000,
                showConfirmButton:false,
                iconColor:'red'
            }) 
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
                <button type="button" onClick={()=>router.push("/Registrarse")}>Registrarse</button>
            </form> 
        </div>    
    )
}

export default LogIn;