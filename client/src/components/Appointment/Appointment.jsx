import React, { useState } from "react";
import { postAppointments,getAllAppointments } from "../../redux/actions";
import {useDispatch} from 'react-redux';
import styles from './Appointment.module.css';

const Appointment=()=>{
    const[input,setInput]=useState({
        time:"",
        date:"",
        name:"",
        lastname:""
    });

    const dispatch=useDispatch();

    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
        console.log(e.target.value);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(postAppointments(input))
        alert("La solicitud de turno fue enviada!")
    }

    return(
            <form onSubmit={handleSubmit} className={styles.form} >
                <div className={styles.inputs}>
                    <div className={styles.input}>
                        <label>Nombre: </label>
                        <input 
                            type="text" 
                            name="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.input}>
                        <label>Apellido: </label>
                        <input 
                            type="text" 
                            name="lastname"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.input}>
                        <label>Fecha: </label>
                        <input 
                            className={styles.date}
                            type="date"   
                            name="date"
                            
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.input}>
                        <label>Horario: </label>
                        <input
                            className={styles.date} 
                            type="time"
                            name="time"
                            onChange={handleChange}
                        />
                    </div>
                    <input type="submit" value="Solicitar" className={styles.button}/>
                </div>
            </form> 
    )
}

export default Appointment;