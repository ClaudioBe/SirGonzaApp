import React from "react";
import {Table, Tag } from "antd";
import { useGetUsersQuery,useDeleteUserForAdminMutation } from "@/redux/services/userApi";
import styles from '@/ui/Users.module.css';
import Swal from "sweetalert2";

const Users=()=>{
    const[deleteUser]=useDeleteUserForAdminMutation()
    const{data:users,isLoading,refetch}=useGetUsersQuery();
    console.log("usuarios: " + users);
    
    const Users=users?.map(u=> ({...u,key:u.id}));

    const handleDelete=(id)=>{
        console.log("id: " + id);
        
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
            <Table columns={columns} dataSource={Users} />
        </div>
    );
}

export default Users;