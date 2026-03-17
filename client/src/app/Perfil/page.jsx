"use client"
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import {useRouter} from "next/navigation";
import DashboardAdmin from './(Admin)/DashboardAdmin';
import { useLogOutMutation } from '@/redux/services/userApi';

function Profile() {
    const [logOut]=useLogOutMutation();
    const router=useRouter()
    const userCookie=Cookies.get('user')
    const user=userCookie?JSON.parse(userCookie):null;

    useEffect(()=>{if(!user)router.push('/')},[])
    const handleClick=()=>{
        logOut()
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
            </div>)
}

export default Profile;