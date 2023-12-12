import React, { useEffect, useState } from "react";
import { postAppointments,getAllAppointments } from "../../redux/actions";
import {useDispatch, useSelector} from 'react-redux';
import styles from './Appointment.module.css';
import swal from "sweetalert2";

const Appointment=()=>{
    //instancio un objeto de tipo Date
    const today=new Date();
    const minDate=today.toISOString().split('T')[0];
    today.setMonth(today.getMonth()+1)
    const maxDate=today.toISOString().split('T')[0];

    const dispatch=useDispatch();

    const[input,setInput]=useState({
        time:"",
        date:"",
        name:"",
        lastname:""
    });
    

    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(postAppointments(input))
        //sweet alert que se muestra por 1s sin ocultando el boton de confirmación
        swal.fire({
            title:"Se ha enviado tu solicitud!",
            icon: 'success',
            timer:2000,
            showConfirmButton:false,
            iconColor:'#888888'
        })  
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
                            min={minDate}
                            max={maxDate}
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