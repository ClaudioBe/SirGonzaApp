import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Menu, Table, Tag } from "antd";
import { deleteAppointment, getAllAppointments, putAppointment } from "../../redux/actions/appointmentActions";
import Reschedule from "../Reschedule/Reschedule";
import styles from './AdminAppointments.module.css';
import CreateAppointment from "../CreateAppointment/CreateAppointment";

const AdminAppointments=()=>{
    const dispatch=useDispatch();
    const[appointmentChanged,setAppointmentChanged]=useState(false);
    const appointments=useSelector(state=>state.allAppointments);
    const Appointments=appointments.map(h=> ({...h,key:h.id}));

    useEffect(()=>{setAppointmentChanged(false)},[appointments,appointmentChanged])
    useEffect(()=>{dispatch(getAllAppointments())},[])

    const handleAccept=(id)=>{
        dispatch(putAppointment({confirmed:true},id))
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
            render:(date_es)=><p>{date_es.substring(0,4)}</p>
        },
        {
            title:"Horario",
            dataIndex:"time",
            key:"time",
            render:(time)=><p>{time.substring(0,5)}</p>
        },
        {
            title:"Acciones",
            dataIndex:"actions",
            key:"actions",
            render:(_, {id,name,lastname,time,date,confirmed})=>
                    <div className={styles.actionsContainer}>
                        {confirmed
                            ? <p>Aceptado!</p>   
                            : <div className={styles.actionsContainer}>
                                <Menu mode="inline" >
                                    <Menu.SubMenu title='Reprogramar'>
                                        <Reschedule 
                                            id={id}
                                            name={name}
                                            lastname={lastname}
                                            time={time}
                                            date={date}
                                        />
                                    </Menu.SubMenu>
                                </Menu>
                                <Tag className={styles.tag}color='green' onClick={()=>handleAccept(id)}>Aceptar</Tag>
                            </div>}
                            <Tag className={styles.tag}color='red' onClick={()=>dispatch(deleteAppointment(id))}>Eliminar</Tag>
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