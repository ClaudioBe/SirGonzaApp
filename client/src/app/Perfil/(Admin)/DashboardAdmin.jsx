import {Menu} from 'antd';
import styles from '@/ui/DashboardAdmin.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {CalendarOutlined, PoweroffOutlined, UserOutlined} from '@ant-design/icons';
import AdminAppointments from './AdminAppointments';
import Users from "./Users"

const DashboardAdmin =()=>{
    const router=useRouter()

    return(
        <div>
            <Menu className={styles.container} mode='inline'>
                <Menu.SubMenu icon={<CalendarOutlined/>} title="Turnos">
                    <div style={{padding:"1%"}}>
                        <AdminAppointments/>
                    </div>  
                </Menu.SubMenu>

                {/* <Menu.SubMenu icon={<UserOutlined/>} title="Clientes registrados">
                    <div style={{padding:"1%"}}>
                        <Users/>
                    </div>  
                </Menu.SubMenu> */}
            
                <Menu.Item icon={<PoweroffOutlined/>} key="logOut" onClick={()=>router.push('/IniciarSesion')} danger={true}>
                    Cerrar Sesion
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default DashboardAdmin; 