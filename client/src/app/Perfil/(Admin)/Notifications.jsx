import React from "react";
import {Table, Tag, Empty, Spin } from "antd";
import { useSelector } from "react-redux";
import { useGetNotificationsQuery,useDeleteAllNotificationsMutation, useDeleteNotificationMutation } from "@/redux/services/notificationsApi";
import styles from '@/ui/Users.module.css';
import Swal from "sweetalert2";

const Notifications=()=>{
    const id = useSelector(state=>state.user.user.id);
    const[deleteNotification]=useDeleteNotificationMutation()
    const{data,isLoading,isError,refetch}=useGetNotificationsQuery(id);
    // 1. Mientras carga, mostramos un spinner
    if (isLoading) return <div style={{ textAlign: 'center', padding: '20px' }}><Spin/></div>;

    //Si hay un error o no hay data 
    if (isError || !data) return <Empty description="No hay notificaciones" />;


    const notifications=data?.map(u=> ({...u,key:u.id}));

    const handleDelete=(id)=>{
            Swal.fire({
                title: "¿Está seguro?",
                text: "Eliminarás la notificación permanentemente",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "green",
                cancelButtonColor: "red",
                confirmButtonText: "Sí, eliminar"
            }).then(async(result) => {
                if(result.isConfirmed){
                    try {
                        await deleteNotification(id).unwrap()
                        //para que se refresquen las notificaciones sin la que se eliminó
                        refetch()
                        Swal.fire({
                            title:"Se ha eliminado la notificación",
                            icon:"success",
                            showCancelButton:false
                        })
                    } catch (error) {
                        console.log("Error notificacion: " + error.data);
                    }
                }
            })
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
            title:"Título",
            dataIndex:"title",
            key:"title",
            render:(text)=><p>{text}</p>
        },
        {
            title:"Mensaje",
            dataIndex:"message",
            key:"message",
            render:(text)=><p>{text}</p>
        },
        {
            title:"Eliminar",
            dataIndex:"eliminar",
            key:"eliminar",
            render:(_,{id})=>
                    <div>
                        <Tag className={styles.tag}color='red' onClick={()=>handleDelete(id)}>Eliminar</Tag>
                    </div>
                
        }
    ]  

    return (
        <div>
            <Table columns={columns} dataSource={notifications} />
        </div>
    );
}

export default Notifications;




// import { useGetNotificationsQuery } from '@/redux/services/notificationsApi';
// import React from 'react';
// import {Empty, Spin} from 'antd'
// import { useSelector } from 'react-redux';


// const Notifications = () => {
//     const id=useSelector(state=>state.user.user.id);
//      // Extraemos también isLoading para saber cuándo terminó la petición
//     const { data, isLoading, isError } = useGetNotificationsQuery(id);

//     // 1. Mientras carga, mostramos un spinner
//     if (isLoading) return <div style={{ textAlign: 'center', padding: '20px' }}><Spin/></div>;

//     // 2. Si hay un error o no hay data 
//     if (isError || !data) return <Empty description="No hay notificaciones" />;

//     return (
//         <div>
//             {data.map(n=><p>{n.message}</p>)}
//         </div>
//     )
// }

// export default Notifications