import React, { useState } from 'react';
import swal from 'sweetalert2';
import styles from '@/ui/Reschedule.module.css';
import {usePutAppointmentMutation } from '@/redux/services/appointmentApi';

//para formatear la fecha de 'en' a 'es'
const format=(date,locale)=> {
    //al formatearla se le resta un dia, por eso...
    date.setDate(date.getDate()+1);
    //para que solo devuelva dia y mes
    const options = {
        day:"numeric",
        month:"numeric",
    }
    return new Intl.DateTimeFormat(locale,options).format(date);
};

function Reschedule({id,name,lastname,time,date_en,phoneNumber,closeModal,refetch,userId}) {
    const[putAppointment]=usePutAppointmentMutation();
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
        date_en
    });

    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        console.log("date_en: " + input.date_en);
        
        const date_es=format(new Date(input.date_en),'es')

        putAppointment({...input,id,date_es})
        refetch()
        closeModal()

        swal.fire({
            title:`Se ha agendado el nuevo horario para ${name} ${lastname}!`,
            text:userId!=null?"Se envió una notificación al cliente":"No se enviará notificacion, el cliente no está registrado",
            icon: 'success',
        })  

    
        const message = `Hola ${name}, tu turno ha sido reprogramado para el día ${date_es} a las ${input.time}hs.`;
        
        //Usamos encodeURIComponent para que los espacios y signos sean válidos en la URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
        //window.open abre una nueva pestaña; si es celular, el sistema abrirá la app de WhatsApp
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        setInput({
            time,
            date_en,
        })
    }
    return (
        <form onSubmit={handleSubmit}>
        <div className={styles.input}>
            <label>Fecha: </label>
            <input 
                className={styles.date}
                type="date"   
                name="date_en"
                min={minDate}
                max={maxDate}
                value={input.date_en}
                onChange={handleChange}
            />
        </div>
        <div className={styles.input}>
            <label>Horario: </label>
            <input
                className={styles.date} 
                type="time"
                name="time"
                value={input.time}
                onChange={handleChange}
            />
        </div>
        <button type='submit'>Reprogramar</button>
    </form>
    );
}

export default Reschedule;