import { useChangePasswordMutation } from '@/redux/services/userApi';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import styles from '@/ui/Form.module.css';
import { useLogOut } from '@/app/hooks/useLogOut';

export default function ChangePassword({id, closeModal}) {
    const [input,setInput]=useState({oldPassword:"",newPassword:"",newPassword2:""});
    const [errors,setErrors]=useState({})

    const[changePassword]=useChangePasswordMutation();
    const{logout}=useLogOut();

    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await changePassword({id,...input}).unwrap()
            Swal.fire({
                title:"Su contraseña fue actualizada!",
                text:"Debe volver a iniciar sesión",
                icon:"success",
                showCancelButton:false
            })
            
            closeModal();   
            await logout()
        } catch (error) {
            setErrors(JSON.parse(error.data))
            Swal.fire({
                title:"Hay errores!",
                icon:"error",
                timer:1000,
                showCancelButton:false,
            })
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>Cambiar contraseña</h1>
                <div>
                    <label>Contraseña anterior</label>
                    <input 
                        type="password" 
                        name="oldPassword" 
                        value={input.oldPassword}
                        onChange={handleChange}
                    /> 
                </div>
                <p>{errors.oldPassword}</p>
                <div>
                    <label>Nueva contraseña</label>
                    <input 
                        type="password" 
                        name='newPassword' 
                        value={input.newPassword}
                        onChange={handleChange}
                    /> 
                </div>
                <p>{errors.newPassword}</p>
                <div>
                    <label>Repetir nueva contraseña</label>
                    <input 
                        type="password" 
                        name="newPassword2" 
                        value={input.newPassword2}
                        onChange={handleChange}
                    />
                </div>
                <p>{errors.newPassword2}</p>
                <button type='submit'>Cambiar contraseña</button>
            </form>
        </div>
    )
}
