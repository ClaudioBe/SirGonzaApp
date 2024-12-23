import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import DashboardAdmin from '../DashboardAdmin/DashboardAdmin';

function Profile() {
    const {name,lastname,userName,phoneNumber}=useSelector(state=>state.user);
    const admin=useSelector(state=>state.admin);
    const dispatch=useDispatch();
    const navigate=useNavigate()

    const handleClick=()=>{
        dispatch(logOut())
        navigate('/IniciarSesion')
    }
    
    return admin
        ? <DashboardAdmin/>
        :(<div>
            <h1>{name}</h1>
            <h1>{lastname}</h1>
            <h2>{userName}</h2>
            <h2>{phoneNumber}</h2>
            <button onClick={handleClick}>Cerrar Sesion</button>
        </div>);
}

export default Profile;