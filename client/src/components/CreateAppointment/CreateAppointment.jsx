import React, { useEffect, useState } from "react";
import { postAppointments,getAllAppointments } from "../../redux/actions/appointmentActions";
import {useDispatch, useSelector} from 'react-redux';
import styles from './CreateAppointment.module.css';
import swal from "sweetalert2";

const CreateAppointment=({admin})=>{
    //instancio un objeto de tipo Date
    const today=new Date(); 
    //cambio today a un formato mas simple y lo separo 
    //para tomar solamente la fecha(año-mes-diaTHora)
    const minDate=today.toISOString().split('T')[0];
    //le asigno a today el proximo mes
    today.setMonth(today.getMonth()+1)
    //vuelvo a tomar solamente la fecha pero ahora con el siguente mes
    const maxDate=today.toISOString().split('T')[0];
    const dispatch=useDispatch();

    useEffect(()=>{dispatch(getAllAppointments())},[])
    const appointments=useSelector(state=> state.allAppointments);
    
    const[submittedForm,setSubmittedForm]=useState(false);

    const[input,setInput]=useState({
        name:"",
        lastname:"",
        phoneNumber:"",
        time:"",
        date_en:"",
    });

    const[errors,setErrors]=useState({});

    const timesGenerator=(start,end)=>{
        const times=[]
        for(i=0;i++;i<5){
            times.push(start + ":00")
            times.push(start + ":30")
        }
    }
    const handleChange=(e)=>{
        if(e.target.name=="date"){
            const dia = new Date(e.target.value).getUTCDay();  
            //si el dia seleccionado es un domingo o un lunes...
            if(dia===0 || dia ===1){
                //para que no se borre lo demas del formulario
                e.preventDefault();
                //elimino la seleccion
                e.target.value = '';
                alert('Domingos y lunes no disponibles!');
            }
            e.target.time
        }
        setInput({...input,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await dispatch(postAppointments(input));
            //sweet alert que se muestra por 1s ocultando el boton de confirmación
            swal.fire({
                title:"Se ha enviado tu solicitud!",
                icon: 'success',
                timer:1000,
                iconColor:'green'
            })  
            
            setInput({
                time:"",
                date_en:"",
                name:"",
                lastname:""
            })
            setSubmittedForm(true);
        } catch (error) {
            setErrors(error)
            swal.fire({
                title:"Hay errores!",
                icon: 'error',
                timer:1000,
                showConfirmButton:false,
                iconColor:'red'
            }) 
        } 
    }

    return(
        <div className={styles.container}>
            <form key={submittedForm} onSubmit={handleSubmit} className={styles.form} >
                <h1>{admin?"" :"Solicitar Turno"}</h1>
                <div>
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        name="name"
                        onChange={handleChange}
                    />
                </div>
                <p>{errors.name}</p>
            
                <div>
                    <label>Apellido</label>
                    <input 
                        type="text" 
                        name="lastname"
                        onChange={handleChange}
                    />
                </div>
                <p>{errors.lastname}</p>

                <div>
                    <div>
                        <label>Número de celular</label>
                        <label>11</label>
                    </div>
                    
                    <input 
                        type="text"
                        name="phoneNumber"
                        placeholder="22334455"
                        inputMode="numeric"
                        maxLength="8"
                        onChange={handleChange}
                    />
                </div> 
                <p>{errors.phoneNumber}</p>

                <div>
                    <label>Fecha</label>
                    <input 
                        className={styles.date}
                        type="date"   
                        name="date_en"
                        min={minDate}
                        max={maxDate}
                        onChange={handleChange}
                    />
                </div>   
                <p>{errors.date}</p>
    
                <div>
                    <label>Horario</label>
                    <select
                        disabled={true}
                        onChange={handleChange}
                    >
                    
                    </select>
                </div>
                <p>{errors.time}</p>
        
                <button type="submit">{admin?"Agregar":"Solicitar"}</button>
            </form> 
        </div>
    )
}

export default CreateAppointment;