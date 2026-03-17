"use client"
import React, { useEffect ,useState} from "react";
import {Table, Tag, Button,Modal } from "antd";
import Reschedule from "./Reschedule";
import styles from '@/ui/AdminAppointments.module.css'
import CreateAppointment from "@/app/Turnos/page";
import { useDeleteAppointmentMutation, useGetAppointmentsQuery, usePutAppointmentMutation } from "@/redux/services/appointmentApi";

const AdminAppointments=()=>{
    const[appointmentChanged,setAppointmentChanged]=useState(false);
    const [isModalRescheduleOpen, setIsModalRescheduleOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen]=useState(false);
   
 
    const handleCancelReschedule = () => {
        setIsModalRescheduleOpen(false);
    };

    const handleCancelCreate=()=>{
        setIsModalCreateOpen(false)
    }

    const{data:appointments,isLoading}=useGetAppointmentsQuery();
    const [updateAppointment]=usePutAppointmentMutation();
    const [deleteAppointment]=useDeleteAppointmentMutation();
    const Appointments=appointments?.map(h=> ({...h,key:h.id}));

    const handleAccept=(id)=>{
        console.log("id: "+id);
        
        updateAppointment({confirmed:true},id);
        setAppointmentChanged(true);
    }

    const handleDelete=(id)=>{
        deleteAppointment(id);
        setAppointmentChanged(true);
    }

    const handleClick=()=>{
        setIsModalCreateOpen(true);
    }

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            sorter: (a, b) => a.id - b.id,
            key: "id",
            render: (text) => <p>{text}</p>,
        },
        {
            title:"Nombre",
            dataIndex:"name",
            key:"name",
            render:(text)=><p>{text}</p>
        },
        {
            title:"Apellido",
            dataIndex:"lastname",
            key:"lastname",
            render:(text)=><p>{text}</p>
        },
        {
            title:"Fecha",
            dataIndex:"date_es",
            key:"date_es",
            render:(date_es)=><p>{date_es}</p>
        },
        {
            title:"Horario",
            dataIndex:"time",
            key:"time",
            render:(time)=><p>{time}</p>
        },
        {
            title:"Acciones",
            dataIndex:"actions",
            key:"actions",
            render:(_, {id,name,lastname,time,date_es,confirmed,phoneNumber})=>
                    <div className={styles.actionsContainer}>
                        {confirmed
                            ? <p>Aceptado!</p>   
                            : <>
                                <Tag className={styles.tag} onClick={()=>setIsModalRescheduleOpen(true)}>Reprogramar</Tag>
                                <Modal
                                    title="Reprogramar"
                                    closable={{ 'aria-label': 'Custom Close Button' }}
                                    open={isModalRescheduleOpen}
                                    onCancel={handleCancelReschedule}
                                    footer={[]}
                                >
                                    <Reschedule 
                                        id={id}
                                        name={name}
                                        lastname={lastname}
                                        time={time}
                                        date_es={date_es}
                                        phoneNumber={phoneNumber}
                                    />
                                </Modal>
                                <Tag className={styles.tag} color='green' onClick={()=>handleAccept(id)}>Aceptar</Tag>
                            </>}
                            <Tag className={styles.tag} color='red' onClick={()=>(handleDelete(id))}>Eliminar</Tag>
                    </div>
                
        }
    ]  

    return (
        <div>
            <Table columns={columns} dataSource={Appointments} />
            <Button onClick={handleClick}>Agendar turno</Button>
            
            <Modal
                title="Agendar Turno"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalCreateOpen}
                onCancel={handleCancelCreate}
                footer={[]}
            >
                <CreateAppointment admin={true}/>
            </Modal>
        </div>
    );
}

export default AdminAppointments;