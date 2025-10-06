import React, { useState } from 'react';
import {useSelector } from 'react-redux';
import swal from 'sweetalert2';
import styles from '@/ui/Reschedule.module.css';
import {usePutAppointmentMutation } from '@/redux/services/appointmentApi';

function Reschedule({id,name,lastname,time,date}) {
    const[putAppointment]=usePutAppointmentMutation();

    const token=useSelector(state=>state.token);
    //instancio un objeto de tipo Date
    const today=new Date(); 
    //cambio today a un formato mas simple y lo separo 
    //para tomar solamente la fecha(año-mes-diaTHora)
    const minDate=today.toISOString().split('T')[0];
    //le asigno a today el proximo mes
    today.setMonth(today.getMonth()+1)
    //vuelvo a tomar solamente la fecha pero ahora con el siguente mes
    const maxDate=today.toISOString().split('T')[0];


    const[input,setInput]=useState({
        time,
        date,
    });

    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        putAppointment(input,id,token)
        //sweet alert que se muestra por 1s ocultando el boton de confirmación
        swal.fire({
            title:`Se ha enviado a ${name} ${lastname} el nuevo horario!`,
            icon: 'success',
            timer:2000,
            showConfirmButton:false,
            iconColor:'#888888'
        })  
        setInput({
            time:"",
            date:"",
        })
    }
    return (
        <form onSubmit={handleSubmit}>
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
        <button type='submit'>Reprogramar</button>
    </form>
    );
}

export default Reschedule;