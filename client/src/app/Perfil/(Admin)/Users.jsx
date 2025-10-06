import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Table, Tag } from "antd";
import { useGetUsers,useDeleteUserForAdminMutation } from "@/redux/services/userApi";
import styles from '@/ui/Users.module.css';

const Users=()=>{
    const dispatch=useDispatch();
    const[userDeleted,setUserDeleted]=useState(null);
    
    const token=useSelector(state=>state.user.token);
    const{data,isLoading,refetch}=useGetUsers();
    const Users=data.map(h=> ({...h,key:h.id}));

    

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
            render:(_, {id})=>
                    <div>
                        <Tag className={styles.tag}color='red' onClick={()=>{dispatch(deleteUserForAdmin(id,token)); refetch()}}>Eliminar</Tag>
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