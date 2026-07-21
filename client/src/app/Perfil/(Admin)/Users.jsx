import React from "react";
import {Button, Spin, Table, Tag } from "antd";
import { useGetUsersQuery,useDeleteUserForAdminMutation, useDeleteAllUsersMutation } from "@/redux/services/userApi";
import styles from '@/ui/Users.module.css';
import Swal from "sweetalert2";

const Users=()=>{
    const[deleteUser]=useDeleteUserForAdminMutation()
    const{data:users,isLoading,refetch}=useGetUsersQuery();
    const [deleteAllUsers]=useDeleteAllUsersMutation();
    
    //Mientras carga se muestra un spinner
    if (isLoading) return <div style={{ textAlign: 'center', padding: '20px' }}><Spin color="#1eca00"/></div>;

    const Users=users?.map(u=> ({...u,key:u.id}));

    const handleDelete=(id)=>{de
            Swal.fire({
                title: "¿Está seguro?",
                text: "Eliminarás el usuario permanentemente",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "green",
                cancelButtonColor: "red",
                confirmButtonText: "Sí, eliminar"
            }).then(async(result) => {
                if(result.isConfirmed){
                    try {
                        await deleteUser(id).unwrap()
                        //para que se refresquen los usuarios sin el que se eliminó
                        refetch()
                        Swal.fire({
                            title:"Se ha eliminado el usuario",
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
                    text:"Eliminarás todos los usuarios registrados permanentemente",
                    icon:"warning",
                    showCancelButton:true,
                    cancelButtonColor:"red",
                    confirmButtonColor:"green",
                    confirmButtonText:"Sí, eliminar"
                }).then(async(result)=>{
                    if(result.isConfirmed){
                        try {
                            await deleteAllUsers().unwrap();
                            refetch()
                            Swal.fire({
                                title:"Se han eliminado todos los registros de usuarios",
                                icon:"success",
                                showCancelButton:false
                            })
                        } catch (error) {
                            console.log("Error al borrar todos los registros de usuarios: " + error.data);
                            
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
            <Table columns={columns} dataSource={Users} scroll={{x:2}}/>
            <Button onClick={handleDeleteAll} disabled={users?.length===0} danger>Eliminar todos</Button>
        </div>
    );
}

export default Users;