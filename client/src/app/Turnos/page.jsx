"use client"
import React, { useState } from "react";
import { 
    useGetAppointmentsQuery, 
    usePostAppointmentsMutation, 
    usePutAppointmentMutation 
} from "@/redux/services/appointmentApi";
import styles from '@/ui/Form.module.css';
import swal from "sweetalert2";

// Función para formatear la fecha a español 
const formatToEs = (dateStr, locale = 'es') => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    const options = { day: "numeric", month: "numeric" };
    return new Intl.DateTimeFormat(locale, options).format(date);
};


//componente que sirve para solicitar turno con o sin sesion activa, 
//para reprogramar y para agendar 

const CreateAppointment = ({ admin, isToEdit = false, appointment= null,isUser=false, closeModal = null }) => {
    const today = new Date(); 
    const minDate = today.toISOString().split('T')[0];
    today.setMonth(today.getMonth() + 1);
    const maxDate = today.toISOString().split('T')[0];
    
    const { data: appointments, isLoading, refetch } = useGetAppointmentsQuery();
    const [createAppointment] = usePostAppointmentsMutation();  
    const [putAppointment] = usePutAppointmentMutation(); // Tu mutación para actualizar

    const [availableTimes, setAvailableTimes] = useState([]);
    const [errors, setErrors] = useState({});

    // Inicialización directa 
    const [input, setInput] = useState(
        isUser
            ?{time:"",date_en:"",...appointment}
            :appointment 
                ? {...appointment} 
                : {
                    name: "",
                    lastname: "",
                    phoneNumber: "",
                    time: "",
                    date_en: "",
                    userId: null
                }
    );

    const timesGenerator = (start, end) => {
        const times = [];
        start--;
        for (var i = 0; i < end; i++) {
            start++;
            times.push(start + ":00");
            times.push(start + ":30");
        }
        return times;
    };    
    const times = timesGenerator(10, 3).concat(timesGenerator(17, 3));

    if (isLoading) return <p color="yellow">Cargandoooooo</p>;

    const handleChange = (e) => {
        if (e.target.name === "date_en") {
            const dia = new Date(e.target.value).getUTCDay();  
            const notAvailableTimes = appointments
                ?.filter(a => a.date_en === e.target.value && a.id !== input.id)
                .map(a => a.time);
            const availableTimes = times.filter(h => !notAvailableTimes?.includes(h));
           
            if (dia === 0 || dia === 1) {
                e.target.value = '';
                alert('Domingos y lunes no disponibles!');
                return;
            }
            if (availableTimes.length === 0) {
                e.target.value = "";
                alert("No hay horarios disponibles ese dia!");
                return;
            }
            
            setAvailableTimes(availableTimes);
        }
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isToEdit) {
                // 1. Calculamos la fecha en español para enviar al servidor y usar en WhatsApp
                const date_es = formatToEs(input.date_en);
                
                // 2. Ejecutamos la actualización pasándole el id y date_es
                await putAppointment({ ...input, date_es }).unwrap();
                
                // 3. Alerta personalizada 
                swal.fire({
                    title: `Se ha agendado el nuevo horario para ${input.name} ${input.lastname}!`,
                    text: input.userId != null ? "Se envió una notificación al cliente" : "No se enviará notificación, el cliente no está registrado",
                    icon: 'success',
                });

                // 4. Disparo automático de WhatsApp
                const message = `Hola ${input.name}, tu turno ha sido reprogramado para el día ${date_es} a las ${input.time}hs.`;
                const whatsappUrl = `https://wa.me/${input.phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

                
            } else {
                // Creación normal de turnos
                await createAppointment(input).unwrap();
                swal.fire({
                    title: admin ? "Turno agendado!" : "Se ha enviado tu solicitud!",
                    icon: 'success',
                });  
                isUser ? setInput({time:"",date_en:""})
                       : setInput({ time: "", date_en: "", name: "", lastname: "", phoneNumber: "" });
            }
            if(closeModal) closeModal(); // Cierra el modal de Ant Design si se pasó la función
            setErrors({});
            refetch();
        } catch (error) {
            if (error.data) setErrors(JSON.parse(error.data));
            swal.fire({
                title: "Hay errores!",
                icon: 'error',
                timer: 1000,
                showConfirmButton: false,
                iconColor: 'red'
            });  
        } 
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form} >
                <h1>{isToEdit ? "Reprogramar Turno" : (admin ? "Agendar Turno" : "Solicitar Turno")}</h1>
                
                <div>
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                        disabled={isToEdit||isUser} 
                    />
                </div>
                <p>{errors.name}</p>
            
                <div>
                    <label>Apellido</label>
                    <input 
                        type="text" 
                        name="lastname"
                        value={input.lastname}
                        onChange={handleChange}
                        disabled={isToEdit||isUser} 
                    />
                </div>
                <p>{errors.lastname}</p>

                <div>
                    <div>
                        <label>Número de celular</label>
                        <label>11</label>
                    </div>
                    <input 
                        type="tel"
                        name="phoneNumber"
                        placeholder="22334455"
                        inputMode="numeric"
                        maxLength="8"
                        value={input.phoneNumber}
                        onChange={handleChange}
                        disabled={isToEdit||isUser} 
                    />
                </div> 
                <p>{errors.phoneNumber}</p>

                <div>
                    <label>Fecha</label>
                    <input 
                        type="date"   
                        name="date_en"
                        min={minDate}
                        max={maxDate}
                        value={input.date_en}
                        onChange={handleChange}
                    />
                </div>   
                <p>{errors.date}</p>
    
                <div>
                    <label>Horario</label>
                    <select
                        disabled={input.date_en === ""}
                        name="time"
                        id="time"
                        value={input.time}
                        onChange={handleChange}
                    >
                        <option value="" >Seleccione un horario</option>
                        {availableTimes.map(t => (
                            <option key={t} value={t}>{t}</option>   
                        ))}
                    </select>
                </div>
                <p>{errors.time}</p>
        
                <button type="submit">{isToEdit ? "Reprogramar" : (admin ? "Agregar" : "Solicitar")}</button>
            </form> 
        </div>
    );
};

export default CreateAppointment;
