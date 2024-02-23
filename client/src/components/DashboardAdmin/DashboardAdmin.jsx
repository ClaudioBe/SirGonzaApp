import {Menu} from 'antd';
import styles from './DashboardAdmin.module.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {CalendarOutlined, UnorderedListOutlined, PoweroffOutlined} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions/userActions';
import AdminHaircuts from '../AdminHaircuts/AdminHaircuts';
import AdminAppointments from '../AdminAppointments/AdminAppointments';
import AdminCarousel from '../AdminCarousel/AdminCarousel';

const DashboardAdmin =()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleClick = ()=> {
        dispatch(logOut()) && navigate("/IniciarSesion");
    };

    return(
        <Menu className={styles.container} mode='inline'>
            <Menu.SubMenu icon={<UnorderedListOutlined/>} title="Cortes">
                <div style={{padding:"1%"}}>
                    <AdminHaircuts/>
                </div>
            </Menu.SubMenu>

            <Menu.SubMenu icon={<CalendarOutlined/>} title="Turnos">
                <div style={{padding:"1%"}}>
                    <AdminAppointments/>
                </div>  
            </Menu.SubMenu>
            
            <Menu.SubMenu title="Carrusel">
                <div style={{padding:"1%"}}>
                    <AdminCarousel />                
                </div>
            </Menu.SubMenu>
        
            <Menu.Item icon={<PoweroffOutlined/>} key="logOut" onClick={handleClick} danger={true}>
                Cerrar Sesion
            </Menu.Item>
        </Menu>
    )
}

export default DashboardAdmin; 