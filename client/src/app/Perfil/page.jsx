"use client"
import React from 'react';
import {useDispatch, useSelector } from 'react-redux';

import {useRouter} from "next/navigation";
import DashboardAdmin from './(Admin)/DashboardAdmin';
import { logout } from '@/redux/features/userSlice';

function Profile() {
    const user=useSelector(state=>state.user.user)
    const router=useRouter()
    const dispatch=useDispatch();
    
    const handleClick=()=>{
        dispatch(logout())
        router.push('/IniciarSesion')
    }
    
    return user?.admin
        ? <DashboardAdmin/>
        :(<div>
            <h1>{user.name}</h1>
            <h1>{user.lastname}</h1>
            <h2>{user.userName}</h2>
            <h2>{user.phoneNumber}</h2>
            <button onClick={handleClick}>Cerrar Sesion</button>
        </div>);
}

export default Profile;