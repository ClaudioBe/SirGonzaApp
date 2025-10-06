import {Menu} from 'antd';
import styles from '@/ui/DashboardAdmin.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import {CalendarOutlined, PoweroffOutlined, UserOutlined} from '@ant-design/icons';
import AdminAppointments from './AdminAppointments';
import Users from "./Users"
import { logout } from '@/redux/features/userSlice';

const DashboardAdmin =()=>{
    const dispatch=useDispatch();
    const router=useRouter()
  
    const [activeKey, setActiveKey] = useState(null);

    const handleClick = ({ key }) => {
        if (key === 'logOut') {
            dispatch(logout());
            router.push("/IniciarSesion");
            //borro del localstorage los datos del usuario
            localStorage.clear();
        } else  setActiveKey(key);
        
    };

    const items = [
        {
            key: 'turnos',
            icon: <CalendarOutlined />,
            label: 'Turnos',
        },
        {
            key: 'clientes',
            icon: <UserOutlined />,
            label: 'Clientes registrados',
        },
        {
            key: 'logOut',
            icon: <PoweroffOutlined />,
            label: 'Cerrar Sesión',
            danger: true,
        },
    ];

    return(
        <div>
            <Menu
                className={styles.container}
                mode="inline"
                items={items}
                onClick={handleClick}
            />

            <div style={{ padding: '1%' }}>
                {activeKey === 'turnos' && <AdminAppointments />}
                {activeKey === 'clientes' && <Users />}
            </div>
        </div>
    )
}

export default DashboardAdmin; 