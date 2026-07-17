"use client"
import React, { useState } from 'react';
import {useRouter} from "next/navigation"
import { useEditProfileMutation, useSignUpMutation } from '@/redux/services/userApi';
import styles from '@/ui/Form.module.css';
import swal from 'sweetalert2'
import Swal from 'sweetalert2';

function Register({isToEdit=false, user, closeModal=null}) {
    const[signUp]=useSignUpMutation();
    const[editProfile]=useEditProfileMutation();

    const[input,setInput]=useState(
        isToEdit? {...user} //si es para editar asigno los datos del usuario a los inputs 
                :{
                    userName:"",
                    name:"",
                    lastname:"",
                    phoneNumber:"",
                    password:""  
                }
    );

    const [errors,setErrors]=useState({})

    const router=useRouter();
    
    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        //despacho la action para registrarse  
        //si hay errores los guardo en el estado local
        console.log("user: "  + JSON.stringify(user));
        console.log("input: "  + JSON.stringify(input));
        
        if(JSON.stringify(user)===JSON.stringify(input)) 
            Swal.fire({
                title:"No ha hecho ningún cambio",
                icon:"warning",
                timer:1000,
                showConfirmButton:false
            })
        else{
            try {  
                //uso await para que espere a que se resuelva la promesa...
                if(isToEdit)await editProfile(input, user.id).unwrap() 
                else{
                    await signUp(input).unwrap(),
                    router.push("/IniciarSesion")
                }

                swal.fire({
                    title:`Se ha${isToEdit?"n guardado los cambios!":" registrado el usuario!"} ` ,
                    icon: 'success',
                    timer:1000,
                    showConfirmButton:false
                }) 
                if(closeModal) closeModal(); // Cierra el modal de Ant Design si se pasó la función
                setErrors({});
            } catch (error) {
                setErrors(JSON.parse(error.data));
                swal.fire({
                    title: "Hay errores!",
                    icon:'error',
                    iconColor:'red',
                    timer:1000
                })
            }
        }
    }

    return (
        <div className={styles.container}>
           <form className={styles.form} onSubmit={handleSubmit}>
                <h1>{isToEdit?"Editar perfil":"Registrarse"}</h1>
                <div>
                    <label>Nombre: </label>
                    <input 
                        type="text"     
                        name="name" 
                        value={input.name} 
                        onChange={handleChange}
                    />
                </div>
                <p>{errors.name}</p>

                <div>
                    <label>Apellido: </label>
                    <input 
                        type="text" 
                        name="lastname" 
                        value={input.lastname} 
                        onChange={handleChange}
                    />
                </div>
                <p>{errors.lastname}</p>
                
                <div>
                    <div>
                        <label>Numero de celular: </label>
                        <label>11</label>
                    </div>
                    <input 
                        type="tel" 
                        name="phoneNumber" 
                        value={input.phoneNumber} 
                        placeholder='22334455' 
                        inputMode="numeric"
                        maxLength="8"
                        onChange={handleChange}
                    />
                </div>
                <p>{errors.phoneNumber}</p>

                <div>
                    <label>Nombre de usuario: </label>
                    <input 
                        type="text" 
                        name="userName" 
                        value={input.userName} 
                        onChange={handleChange}
                    />
                </div>
                <p>{errors.userName}</p>

                {!isToEdit &&
                    <>
                        <div>
                            <label>Contraseña: </label>
                            <input 
                                type="password" 
                                name="password" 
                                value={input.password} 
                                onChange={handleChange}/> 
                        </div>
                        <p>{errors.password}</p>
                    </>   
                }   
                
                <button type="submit">{isToEdit?"Guardar":"Crear usuario"}</button>
            </form> 
        </div>    
    )
}

export default Register;