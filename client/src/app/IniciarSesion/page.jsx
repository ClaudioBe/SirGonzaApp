"use client"
import React, { useEffect, useState } from "react";
import { useLogInMutation ,useSubscriptionMutation} from "@/redux/services/userApi";
import styles from "@/ui/LogIn.module.css";
import { useRouter } from 'next/navigation';
import swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logout, setUser } from "@/redux/features/userSlice";
const PUBLIC_VAPID_KEY='BLi0bbWUXw3MjOQayCJ7T1_NhkSL-ypZ3R_GoTVQZM9Azs2Wex9m3abZ9HDRGMOahe02VlJgWAwbiXjpSrzm9zI'

//para convertir el PUBLIC_VAPID_KEY de string a Uint8Array
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
const subscriptionWorker=async()=>{
    const register= await navigator.serviceWorker.register('/worker.js',{
        scope:'/'   
    })
    let subscription;
    try {
        subscription= await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    }) 
    } catch (error) {
        throw Error("SW: " + error.message)
    }
    return subscription;
}

const LogIn=()=>{
    const [input,setInput]=useState({userName:"",password:""});
    const [errors,setErrors]=useState({})

    const[logIn]=useLogInMutation();
    const[subscription]=useSubscriptionMutation();
    const router=useRouter();
    const dispatch=useDispatch();
    
    useEffect(()=>{dispatch(logout())},[dispatch])
    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        //despacho la action para iniciar sesion  
        //si hay errores los guardo en el estado local
        try {
            //.unwrap() para poder capturar el error
            const user=await logIn(input).unwrap()
            dispatch(setUser(user))
            console.log("login comp: " + user.id);
            try {
                //push subscription
                const PS = await subscriptionWorker(); 
                console.log("sw: " + PS);
                
                const subs=await subscription({PS,id:user.id});
                console.log("subs: " + subs);
                
            } catch (error) {
                console.log("Error de suscripcion: " + error.message);
                
            }
            
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