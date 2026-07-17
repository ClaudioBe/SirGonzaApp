"use client"
import React, { useState} from "react";
import {Table, Tag, Button,Modal } from "antd";
import styles from '@/ui/AdminAppointments.module.css'
import CreateAppointment from "@/app/Turnos/page";
import { useDeleteAllAppointmentsMutation, useDeleteAppointmentMutation, useDeleteOldAppointmentsMutation, useGetAppointmentsQuery, usePutAppointmentMutation } from "@/redux/services/appointmentApi";
import { utils , writeFile} from "xlsx";
import Swal from "sweetalert2";

const AdminAppointments=()=>{
    const [isModalRescheduleOpen, setIsModalRescheduleOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen]=useState(false);
    //estado local para guardar el usuario al reprogramar
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const openReschedule = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalRescheduleOpen(true);
    };

    const{data:appointments,isLoading,refetch}=useGetAppointmentsQuery();
    console.log("turnos" + appointments);
    
    const [deleteOldAppointments]=useDeleteOldAppointmentsMutation();
    const [updateAppointment]=usePutAppointmentMutation();
    const [deleteAllAppointments]=useDeleteAllAppointmentsMutation();
    const [deleteAppointment]=useDeleteAppointmentMutation();

    const handleAccept=(id,userId)=>{   
        Swal.fire({
            title: "¿Está seguro?",
            text: "Marcarás el turno como aceptado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "red",
            confirmButtonText: "Sí, aceptar"
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    //rtk query solo acepta un parametro, por eso debo pasarlo dentro de un objeto
                    await updateAppointment({confirmed:true,id}).unwrap()
                    //para que se refresquen los turnos con el que se acepto
                    refetch();
                    Swal.fire({
                        title:"Has aceptado el Turno",
                        text:userId!=null?"Se envió una notificación al cliente":"No se enviará notificacion, el cliente no está registrado",
                        icon: "success",
                        showCancelButton:false
                    })
                    } catch (error) {
                        console.log(error.data);
                    }    
            }
        })
    }
    const handleDelete=(id)=>{
        Swal.fire({
            title: "¿Está seguro?",
            text: "Eliminarás el turno permanentemente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "red",
            confirmButtonText: "Sí, eliminar"
        }).then(async(result) => {
            if(result.isConfirmed){
                try {
                    await deleteAppointment(id).unwrap()
                    //para que se refresquen los turnos con el que se eliminó
                    refetch()
                    Swal.fire({
                        title:"Se ha eliminado el turno",
                        icon:"success",
                        showCancelButton:false
                    })
                } catch (error) {
                    console.log(error.data);
                }
            }
        })
    }

    const handleDeleteAll=()=>{
            Swal.fire({
                title:"¿Estás seguro?",
                text:"Eliminarás todos los registros de turnos permanentemente",
                icon:"warning",
                showCancelButton:true,
                cancelButtonColor:"red",
                confirmButtonColor:"green",
                confirmButtonText:"Sí, eliminar"
            }).then(async(result)=>{
                if(result.isConfirmed){
                    try {
                        await deleteAllAppointments().unwrap();
                        refetch()
                        Swal.fire({
                            title:"Se han eliminado todos los registros de turnos",
                            icon:"success",
                            showCancelButton:false
                        })
                    } catch (error) {
                        console.log("Error al borrar todos los registros de turnos: " + error.data);
                        
                    }
                }
            })
    }
    const handleExport=async()=>{
        //filtro los turnos que ya se hayan confirmado
        const appointmentsAccepted=appointments
                                    .filter(a=>a.confirmed===true)
                                    // retorno las props importantes y en español 
                                    .map(a=> {return {
                                        Nombre: a.name,
                                        Apellido:a.lastname,
                                        Fecha: a.date_es,
                                        Hora:a.time,
                                        Numero_tel: a.phoneNumber
                                    }})
        //instancio un objeto de tipo Date
        //lo paso a un formato mas simple y lo separo 
        //para tomar solamente la fecha(año-mes-diaTHora)
        const today=new Date().toISOString().split('T')[0];
        
        const wb = utils.book_new();
        const ws = utils.json_to_sheet(appointmentsAccepted);

        utils.book_append_sheet(wb,ws,today)

        writeFile(wb, `${today}.xlsx`)

        Swal.fire({
            title:"¿Desea eliminar los turnos antiguos?",
            text:"Se eliminarán los turnos de hace 30 días o más",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "red",
            confirmButtonText: "Sí, eliminar"
            }).then(async(result)=>{
                if(result.isConfirmed){
                    try {
                        const deleted=await deleteOldAppointments().unwrap()
                        Swal.fire({
                            title:`Se han eliminado ${deleted} registros de turnos`,
                            icon:"success",
                            showCancelButton:false
                        })
                        } catch (error) {
                            Swal.fire({
                                title:"Error",
                                text:error.data,
                                icon:"error",
                                showCancelButton:false
                            }) 
                        } 
                    }
            })
    }

    const columns = [
        {
            title:"Fecha",
            dataIndex:"date_es",
            key:"date_es",
            sorter:(a,b)=>new Date(a.date_en) - new Date(b.date_en),//para que se pueda ordenar por fecha
            sortDirections:["ascend","descend","ascend"],//para que cambie con cada click
            render:(date_es)=><p>{date_es}</p>
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
            title:"Horario",
            dataIndex:"time",
            key:"time",
            render:(time)=><p>{time}</p>
        },
        {
            title:"Estado",
            dataIndex:"confirmed",
            key:"confirmed",
            render:(confirmed)=><p>{confirmed?"Aceptado":"Pendiente"}</p>
        },
        {
            title:"Acciones",
            dataIndex:"actions",
            key:"actions",
            //render recibe 3 args=> (text #lo que haya en la prop de key#,
            // record #el obj de la fila#, index #numero de fila#)
            //poner _ como arg significa que no voy a usar ese arg
            render:(_, appointment)=>{
                    const {key,...Appointment}=appointment;
                    return <div className={styles.actionsContainer}>
                        {appointment.confirmed
                            ? <></>
                            : <>
                                <Tag className={styles.tag} onClick={()=>openReschedule(Appointment)}>Reprogramar</Tag>
                               
                                <Tag className={styles.tag} color='green' onClick={()=>handleAccept(appointment.id,appointment.userId)}>Aceptar</Tag>
                            </>}
                            <Tag className={styles.tag} color='red' onClick={()=>(handleDelete(appointment.id))}>Eliminar</Tag>
                    </div>   
            }
        }
    ]  

    return (
        <div>
            {/* hago el mapeo para ponerle un key a cada appointment para antd*/}
            <Table 
                columns={columns} 
                dataSource={appointments?.map(h=> ({...h,key:h.id}))} 
                scroll={{ x: 2 }} //para que se pueda scrollear en celular, funciona con cualquier numero
            />
            <Button onClick={()=>setIsModalCreateOpen(true)}>Agendar turno</Button>
            <Button onClick={handleExport}>Descargar excel</Button>
            <Button onClick={handleDeleteAll} disabled={appointments?.length===0} danger>Eliminar todos</Button>
            <Modal
                title={null}
                open={isModalRescheduleOpen}
                onCancel={() => setIsModalRescheduleOpen(false)}
                destroyOnHidden={true}
                footer={null}
            >
                {selectedAppointment && (
                    <CreateAppointment 
                        key={selectedAppointment.id}
                        appointment={selectedAppointment}
                        //le paso la funcion para cerrar el modal por prop
                        closeModal={()=>setIsModalRescheduleOpen(false)}
                        isToEdit={true}
                        admin={true}
                        refetch={refetch}
                    />
                )}
                    
            </Modal>
            <Modal
                title={null}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalCreateOpen}
                onCancel={()=>setIsModalCreateOpen(false)}
                destroyOnHidden={true}
                footer={null}
            >
                <CreateAppointment admin={true} accept={handleAccept}/>
            </Modal>
        </div>
    );
}

export default AdminAppointments;