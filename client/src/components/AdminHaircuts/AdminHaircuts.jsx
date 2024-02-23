import React, { useEffect , useState} from 'react';
import {Table, Tag, Menu} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHaircut, getAllHaircuts } from '../../redux/actions/haircutActions';
import UploadHaircut from '../UploadHaircut/UploadHaircut';
import styles from './AdminHaircuts.module.css';

function AdminHaircuts() {
    const dispatch=useDispatch();
    const[haircutWasDeleted,setHaircutWasDeleted]=useState(false);
    const haircuts=useSelector(state=>state.allHaircuts);

    useEffect(()=>{dispatch(getAllHaircuts())},[haircutWasDeleted])

    const Haircuts=haircuts.map(h=> ({...h,key:h.id}));
    
    const handleDelete=(id)=>{
        dispatch(deleteHaircut(id));
        setHaircutWasDeleted(true);
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
            title:"Fotos",
            dataIndex:"images",
            key:"images",
            render:(images)=>images.map(i=><img style={{marginLeft:'2%'}} height="50px" width="45px" src={i.secure_url}/>)
        },
        {
            title:"Acciones",
            dataIndex:"actions",
            key:"actions",
            render:(_,{id})=><div>
                                {haircutWasDeleted
                                    ?<p>Corte eliminado</p>   
                                    
                                    :<Tag 
                                        className={styles.tag}
                                        color='red' 
                                        onClick={()=>handleDelete(id)}>
                                        Eliminar
                                    </Tag>}
                            </div>
        }         
    ]  
    return (
        <div>
            <Table columns={columns} dataSource={Haircuts}/>
            <Menu mode="inline">
                <Menu.SubMenu title="Agregar corte">
                    <UploadHaircut/>
                </Menu.SubMenu>
            </Menu>
        </div>
    );
}

export default AdminHaircuts;