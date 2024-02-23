import React, { useEffect, useState } from "react";
import { postAppointments,getAllAppointments } from "../../redux/actions/appointmentActions";
import {useDispatch, useSelector} from 'react-redux';
import styles from './CreateAppointment.module.css';
import swal from "sweetalert2";

const validate=(input)=>{
    let errors = {};
    
    //expresion para evaluar que solo se ingresen letras
    const regexLetters = RegExp(/^[A-Za-z\s]+$/);
    
    if(input.name=="") errors.name="Debe ingresar su nombre";

    if(input.name.length>30) errors.name="Nombre demasiado largo";

    if(input.name && !regexLetters.test(input.name)) errors.name="Debe ingresar solamente letras";

    if(input.lastname=="") errors.lastname = "Debe ingresar su apellido";

    if(input.lastname.length>30) errors.lastname="Apellido demasiado largo";

    if(input.lastname && !regexLetters.test(input.lastname)) errors.lastname="Debe ingresar solamente letras";
    
    if(!input.time) errors.time="Debe elegir un horario";

    if(!input.date_en) errors.date="Debe elegir una fecha";

    return errors;
}

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

    const[submittedForm,setSubmittedForm]=useState(false);

    const[input,setInput]=useState({
        time:"",
        date_en:"",
        name:"",
        lastname:""
    });

    const[errors,setErrors]=useState({});

    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
        setErrors(validate({...input,[e.target.name]:e.target.value}));
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setErrors(validate({...input,[e.target.name]:e.target.value}));
        if(!errors.length){
            dispatch(postAppointments(input))
            //sweet alert que se muestra por 1s ocultando el boton de confirmación
            swal.fire({
                title:"Se ha enviado tu solicitud!",
                icon: 'success',
                timer:2000,
                showConfirmButton:false,
                iconColor:'#888888'
            })  
            setInput({
                time:"",
                date_en:"",
                name:"",
                lastname:""
            })
            setSubmittedForm(true);
        }
        else{
            swal.fire({
                title:"Hay errores!",
                icon: 'error',
                timer:2000,
                showConfirmButton:false,
                iconColor:'#888888'
            }) 
        }   
    }

    return(
        <div className={styles.container}>
            <form key={submittedForm} onSubmit={handleSubmit} className={styles.form} >
                <div className={admin?styles.inputsAdmin:styles.inputs}>
                    <div className={styles.input}>
                        <label>Nombre: </label>
                        <input 
                            type="text" 
                            name="name"
                            onChange={handleChange}
                        />
                        {errors.name && (<p color="red">{errors.name}</p>)}
                    </div>
                    <div className={admin?styles.inputAdmin:styles.input}>
                        <label>Apellido: </label>
                        <input 
                            type="text" 
                            name="lastname"
                            onChange={handleChange}
                        />
                        {errors.lastname && (<p color="red">{errors.lastname}</p>)}
                    </div>
                    <div className={styles.input}>
                        <label>Fecha: </label>
                        <input 
                            className={styles.date}
                            type="date"   
                            name="date_en"
                            min={minDate}
                            max={maxDate}
                            onChange={handleChange}
                        />
                        {errors.date && (<p color="red">{errors.date}</p>)}
                    </div>
                    <div className={styles.input}>
                        <label>Horario: </label>
                        <input
                            className={styles.date} 
                            type="time"
                            name="time"
                            onChange={handleChange}
                        />
                        {errors.time && (<p color="red">{errors.time}</p>)}
                    </div>
                    <input type="submit" value={admin?"Agregar":"Solicitar"} className={styles.button}/>
                </div>
            </form> 
        </div>
    )
}

export default CreateAppointment;