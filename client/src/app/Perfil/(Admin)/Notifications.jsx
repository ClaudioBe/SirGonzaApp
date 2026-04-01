import { useGetNotificationsQuery } from '@/redux/services/notificationsApi';
import React from 'react';
import {Empty, List, Spin} from 'antd'
import { useSelector } from 'react-redux';


const Notifications = () => {
    const id=useSelector(state=>state.user.user.id);
     // Extraemos también isLoading para saber cuándo terminó la petición
    const { data, isLoading, isError } = useGetNotificationsQuery(id);

    // 1. Mientras carga, mostramos un spinner
    if (isLoading) return <div style={{ textAlign: 'center', padding: '20px' }}><Spin/></div>;

    // 2. Si hay un error o no hay data, mostramos un mensaje amigable
    if (isError || !data) return <Empty description="No hay notificaciones" />;

    return (
        <div>
            {data.map(n=><p>{n.message}</p>)}
        </div>
    )
}

export default Notifications