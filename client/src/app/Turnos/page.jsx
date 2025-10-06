"use client"
import React, { useState } from "react";
import { useGetAppointmentsQuery, usePostAppointmentsMutation } from "@/redux/services/appointmentApi";
import styles from '@/ui/CreateAppointment.module.css';
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
    
    const{data:appointments,isLoading,refetch}=useGetAppointmentsQuery();
    const[createAppointment]=usePostAppointmentsMutation();  
    
    if(isLoading) <p color="yellow">Cargandoooooo</p>
        
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
        start--;
        for(var i=0;i<end;i++){
            start++;
            times.push(start + ":00")
            times.push(start + ":30")
        }
        return times;
    }
    
    const times=timesGenerator(10,3).concat(timesGenerator(17,3));
    const handleChange=(e)=>{
            const dia = new Date(e.target.value).getUTCDay();  
           
            const notAvailableTimes=appointments?.filter(a=>a.date_en===e.target.value)
                .map(a=>a.time)
            //filtro de todos los horarios posibles, los que estan disponibles en la fecha seleccionada
            const availableTimes=times.filter(h=>!notAvailableTimes?.includes(h))
                .map(h=>` <option value=${h}>${h}</option>`)
            
             //si el dia seleccionado es un domingo o un lunes...
            if(e.target.name=="date_en"){
                if(dia===0 || dia ===1){
                    //para que no se borre lo demas del formulario
                 
                    //elimino la seleccion
                    e.target.value = '';
                    alert('Domingos y lunes no disponibles!');
                }
                if(availableTimes.length==0) {
                    e.target.value="";
                    alert("No hay horarios disponibles ese dia!")
                }
                //primera opcion como placeholder
            document.getElementById('time').innerHTML=["<option disabled selected>Selecciona una opción</option>"].concat(availableTimes);
             //una vez seleccionada la fecha se activa el select del horario con los que estan disponibles
            document.getElementById("time").disabled=false;
            
        }
        setInput({...input,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await createAppointment(input).unwrap();
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
            setErrors({
                time:"",
                date_en:"",
                name:"",
                lastname:""
            })
            //vuelvo a hacer un fetch de los turnos para que data cambie, y asi luego de pedir un turno..
            //el horario no este disponible sin necesidad de recargar la pagina 
            refetch()
            //al solicitar el turno cambia el estado de submittedForm para que vuelva a renderizarse el..
            //componente
            setSubmittedForm(submittedForm?false:true);
        } catch (error) {
            setErrors(JSON.parse(error.data))
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
                        name="time"
                        id="time"
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