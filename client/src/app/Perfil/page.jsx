"use client"
import React, { useEffect, useState } from 'react';
import styles from '@/ui/Dashboard.module.css';
import {useRouter} from "next/navigation";
import DashboardAdmin from './(Admin)/DashboardAdmin'
import CreateAppointment from "../Turnos/page"
import { useLogOut } from '../hooks/useLogOut';
import { useSelector } from 'react-redux';
import { Menu, Modal } from 'antd';
import { BellOutlined, CalendarOutlined, EditOutlined, LockOutlined, PoweroffOutlined } from '@ant-design/icons';
import Notifications from './(User)/Notifications'
import Register from '../Registrarse/page';
import ChangePassword from './(User)/ChangePassword';

function Profile() {
    const {logout}=useLogOut();
    const [isModalReqAppointmentOpen, setIsModalReqAppointmentOpen] = useState(false);
    const [isModalEditProfileOpen, setIsModalEditProfileOpen] = useState(false);
    const [isModalChangePasswordOpen, setIsModalChangePasswordOpen]=useState(false)

    const router=useRouter()
    //obtengo los datos del usuario guardado en el estado de redux
    const user= useSelector(state=>state.user.user)  
    if(user) {var {pushSubscription, admin, ...userToEdit}=user};
    //al renderizar el componente si el usuario es nulo se redirige al inicio despues de retornar null
    useEffect(()=>{if(user==null) router.push('/')},[])
    
    //items del menú de antd en un array 
    const items = [
        {
            key:'appointment',
            icon:<CalendarOutlined/>,
            label:"Solicitar turno",
            onClick:()=>setIsModalReqAppointmentOpen(true)
        }, 
        {
            key:'notifications_submenu',
            icon:<BellOutlined/>,
            label:"Notificaciones",
            children:[
                {
                    key:"notifications_content",
                    label:(
                        <div style={{padding:"1%"}}>
                            <Notifications/> 
                        </div>
                    ),
                    type:'group'
                }
            ]
        },
        {
            key:"edit",
            icon: <EditOutlined/>,
            label:"Editar datos",
            onClick:()=>setIsModalEditProfileOpen(true)
        },
        {
            key:"changePassword",
            icon:<LockOutlined/>,
            label:"Cambiar Contraseña",
            onClick:()=>setIsModalChangePasswordOpen(true)
            
        },
        {
            key: 'logOut',
            icon: <PoweroffOutlined />,
            label: 'Cerrar Sesion',
            danger: true,
            onClick: () => logout(),
        }
    ];
    if(user==null) return null;

    return user?.admin
            ? <DashboardAdmin/>
            :<div>
                <Menu 
                    className={styles.container} 
                    mode="inline" 
                    items={items} 
                />
                <Modal
                    title={null}
                    open={isModalReqAppointmentOpen}
                    onCancel={() => setIsModalReqAppointmentOpen(false)}
                    destroyOnHidden={true}
                    footer={null}
                >
                    <CreateAppointment
                        key={user.id}
                        appointment={{userId:user.id,...user}}
                        isUser={true}
                        //le paso la funcion para cerrar el modal por prop
                        closeModal={()=>setIsModalReqAppointmentOpen(false)}
                    />
                </Modal>
                <Modal
                    title={null}
                    open={isModalEditProfileOpen}
                    onCancel={() => setIsModalEditProfileOpen(false)}
                    destroyOnHidden={true}
                    footer={null}
                >
                    <Register
                        key={user}//si se hace un cambio se remonta el componente
                        isToEdit={true}
                        user={userToEdit}
                        //le paso la funcion para cerrar el modal por prop
                        closeModal={()=>setIsModalEditProfileOpen(false)}
                    />
                </Modal>
                <Modal
                    title={null}
                    open={isModalChangePasswordOpen}
                    onCancel={() => setIsModalChangePasswordOpen(false)}
                    destroyOnHidden={true}
                    footer={null}
                >
                    <ChangePassword
                        id={user.id}
                        closeModal={()=>setIsModalChangePasswordOpen(false)}
                    />
                </Modal>
            </div>
}

export default Profile;