import { Menu } from 'antd';
import styles from '@/ui/DashboardAdmin.module.css';
import React from 'react';
import { useRouter } from 'next/navigation';
import { CalendarOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import AdminAppointments from './AdminAppointments';
import { useLogOutMutation } from '@/redux/services/userApi';

const DashboardAdmin = () => {
    const [logOut]=useLogOutMutation()
    const router = useRouter();

    //items del menú de antd en un array 
    const items = [
        {
            key: 'turnos_submenu', 
            icon: <CalendarOutlined />,
            label: 'Turnos',
            children: [
                {
                    key: 'turnos_content',
                    label: (
                        <div style={{ padding: "1%" }}>
                            <AdminAppointments />
                        </div>
                    ),
                    type: 'group', // Esto permite meter el componente adentro sin errores
                },
            ],
        },
        {
            key: 'logOut',
            icon: <PoweroffOutlined />,
            label: 'Cerrar Sesion',
            danger: true,
            onClick: () => logOut() && router.push('/IniciarSesion'),
        },
    ];

    return (
        <div>
            <Menu 
                className={styles.container} 
                mode="inline" 
                items={items} // Pasamos los items por prop
            />
        </div>
    );
};

export default DashboardAdmin; 