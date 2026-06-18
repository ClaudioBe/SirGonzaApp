"use client"
import React, { useState } from 'react';
import {useRouter} from "next/navigation"
import { useSignUpMutation } from '@/redux/services/userApi';
import styles from '@/ui/Form.module.css';
import swal from 'sweetalert2'

function Register() {
    const[signUp]=useSignUpMutation();
    const[input,setInput]=useState({
        userName:"",
        name:"",
        lastname:"",
        phoneNumber:"",
        password:""
    });

    const [errors,setErrors]=useState({})

    const router=useRouter();
    
    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        //despacho la action para registrarse  
        //si hay errores los guardo en el estado local
        try {
            //uso await para que espere a que se resuelva la promesa...
            await signUp(input).unwrap();
            swal.fire({
                title:"Se ha registrado el usuario!",
                icon: 'success',
                timer:1000,
                iconColor:'#888888'
            }) 
            router.push("/IniciarSesion");
        } catch (error) {
            console.log("error: " + error);
            
            setErrors(JSON.parse(error.data));
            swal.fire({
                title: "Hay errores!",
                icon:'error',
                iconColor:'red',
                timer:1000
            })
        }
    }

    return (
        <div className={styles.container}>
           <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Registrarse</h1>
                <div>
                    <label>Nombre: </label>
                    <input type="text" name="name" value={input.name} onChange={handleChange}/>
                </div>
                <p>{errors.name}</p>

                <div>
                    <label>Apellido: </label>
                    <input type="text" name="lastname" value={input.lastname} onChange={handleChange}/>
                </div>
                <p>{errors.lastname}</p>
                
                <div>
                    <div>
                        <label>Numero de celular: </label>
                        <label>11</label>
                    </div>
                    <input type="number" name="phoneNumber" value={input.phoneNumber} placeholder='22334455' onChange={handleChange}/>
                </div>
                <p>{errors.phoneNumber}</p>

                <div>
                    <label>Nombre de usuario: </label>
                    <input type="text" name="userName" value={input.userName} onChange={handleChange}/>
                </div>
                <p>{errors.userName}</p>

                <div>
                   <label>Contraseña: </label>
                    <input type="password" name="password" value={input.password} onChange={handleChange}/> 
                </div>
                <p>{errors.password}</p>
                
                <button type="submit">Crear usuario</button>
            </form> 
        </div>    
    )
}

export default Register;