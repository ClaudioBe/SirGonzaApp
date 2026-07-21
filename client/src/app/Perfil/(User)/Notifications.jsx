import React from "react";
import {Table, Tag, Empty, Spin, Button } from "antd";
import { useSelector } from "react-redux";
import { useGetNotificationsQuery,useDeleteAllNotificationsMutation, useDeleteNotificationMutation } from "@/redux/services/notificationsApi";
import styles from '@/ui/Users.module.css';
import Swal from "sweetalert2";

const Notifications=()=>{
    const id = useSelector(state=>state.user.user.id);
    const[deleteNotification]=useDeleteNotificationMutation()
    const[deleteAllNotification]=useDeleteAllNotificationsMutation()
    const{data,isLoading,isError,refetch}=useGetNotificationsQuery(id);
    //Mientras carga se muestra un spinner
    if (isLoading) return <div style={{ textAlign: 'center', padding: '20px' }}><Spin color="#1eca00"/></div>;

    //Si hay un error o no hay data 
    if (isError || !data) return <Empty description="No hay notificaciones" />;

    const handleDeleteAll=()=>{
        Swal.fire({
            title:"¿Estás seguro?",
            text:"Eliminarás todas las notificaciones permanentemente",
            icon:"warning",
            showCancelButton:true,
            cancelButtonColor:"red",
            confirmButtonColor:"green",
            confirmButtonText:"Sí, eliminar"
        }).then(async(result)=>{
            if(result.isConfirmed){
                try {
                    await deleteAllNotification(id).unwrap();
                    refetch()
                    Swal.fire({
                        title:"Se han eliminado todas las notificaciones",
                        icon:"success",
                        showCancelButton:false
                    })
                } catch (error) {
                    console.log("Error al borrar todas las notis: " + error.data);
                    
                }
            }
        })
    }

    const notifications=data?.map((u,index)=> ({...u,key:u.id,number:index+1}));

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
            title: "Nº",
            dataIndex: "number",
            key: "number",
            sorter: (a, b) => a.number - b.number,
            sortDirections:["ascend","descend","ascend"],
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
            <Table columns={columns} dataSource={notifications} scroll={{x:2}}/>
            <Button onClick={handleDeleteAll} danger disabled={notifications?.length===0}>Eliminar todas</Button>
        </div>
    );
}

export default Notifications;