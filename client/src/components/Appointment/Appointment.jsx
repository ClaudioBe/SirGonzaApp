import React, { useState } from "react";
import { postAppointments,getAllAppointments } from "../../redux/actions";
import {useDispatch} from 'react-redux';

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
        <>
            <form onSubmit={handleSubmit}>
                <label>Nombre: </label>
                <input 
                    type="text" 
                    name="name"
                    onChange={handleChange}
                />
                <label>Apellido: </label>
                <input 
                    type="text" 
                    name="lastname"
                    onChange={handleChange}
                />
                <label>Fecha: </label>
                <input 
                    type="date"   
                    name="date"
                    onChange={handleChange}
                />
                <input 
                    type="time"
                    name="time"
                    onChange={handleChange}
                />
                <button type="submit">Solicitar</button>
            </form>  
        </>
    )
}

export default Appointment;