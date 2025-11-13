"use client"
import React, { useEffect ,useState} from "react";
import {Menu, Table, Tag, Button,Modal } from "antd";
import Reschedule from "./Reschedule";
import styles from '@/ui/AdminAppointments.module.css'
import CreateAppointment from "@/app/Turnos/page";
import { useDeleteAppointmentMutation, useGetAppointmentsQuery, usePutAppointmentMutation } from "@/redux/services/appointmentApi";

const AdminAppointments=()=>{
    const[appointmentChanged,setAppointmentChanged]=useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const{data:appointments,isLoading}=useGetAppointmentsQuery();
    const [updateAppointment]=usePutAppointmentMutation();
    const [deleteAppointment]=useDeleteAppointmentMutation();
    const token=JSON.parse(localStorage.getItem("user")).token;
    const Appointments=appointments?.map(h=> ({...h,key:h.id}));

    useEffect(()=>{setAppointmentChanged(false)},[appointments,appointmentChanged])

    const handleAccept=(id)=>{
        updateAppointment({confirmed:true},id,token);
        setAppointmentChanged(true);
    }

    const handleDelete=(id)=>{
        deleteAppointment(id,token);
        setAppointmentChanged(true);
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
                                <Tag className={styles.tag} onClick={()=>showModal()}>Reprogramar</Tag>
                                <Modal
                                    title="Basic Modal"
                                    closable={{ 'aria-label': 'Custom Close Button' }}
                                    open={isModalOpen}
                                    onCancel={handleCancel}
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
            <Menu mode="inline">
                <Menu.SubMenu title="Agregar turno">
                    <CreateAppointment admin={true}/>
                </Menu.SubMenu>
            </Menu>
        </div>
    );
}

export default AdminAppointments;