import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Table, Tag } from "antd";
import { getUsers } from "../../redux/actions/userActions";
import styles from './Users.module.css';

const Users=()=>{
    const dispatch=useDispatch();
    const users=useSelector(state=>state.users);
    const token=useSelector(state=>state.token);
    const Users=users.map(h=> ({...h,key:h.id}));

    useEffect(()=>{dispatch(getUsers())},[])

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
                        <Tag className={styles.tag}color='red' onClick={()=>dispatch(deleteAppointment(id,token))}>Eliminar</Tag>
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