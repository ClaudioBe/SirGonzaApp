import {Menu} from 'antd';
import styles from './DashboardAdmin.module.css';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {CalendarOutlined, PoweroffOutlined, UserOutlined} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions/userActions';
import AdminAppointments from '../AdminAppointments/AdminAppointments';

const DashboardAdmin =()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleClick = ()=> {
        dispatch(logOut()) && navigate("/IniciarSesion");
    };

    return(
        <Menu className={styles.container} mode='inline'>

            <Menu.SubMenu icon={<CalendarOutlined/>} title="Turnos">
                <div style={{padding:"1%"}}>
                    <AdminAppointments/>
                </div>  
            </Menu.SubMenu>
            <Menu.SubMenu icon={<userOutlined/>} title="Clientes registrados">
                <div style={{padding:"1%"}}>
                    <AdminAppointments/>
                </div>  
            </Menu.SubMenu>
        
            <Menu.Item icon={<PoweroffOutlined/>} key="logOut" onClick={handleClick} danger={true}>
                Cerrar Sesion
            </Menu.Item>
            
        </Menu>
    )
}

export default DashboardAdmin; 