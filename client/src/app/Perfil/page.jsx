"use client"
import React, { useEffect } from 'react';
import {useRouter} from "next/navigation";
import DashboardAdmin from './(Admin)/DashboardAdmin';
import { useLogOutMutation } from '@/redux/services/userApi';
import { useSelector } from 'react-redux';

function Profile() {
    const [logOut]=useLogOutMutation();
    const router=useRouter()
    //obtengo los datos del usuario guardado en el estado de redux
    const user= useSelector(state=>state.user)  

    //al renderizar el componente si el usuario es nulo se redirige al inicio despues de retornar null
    useEffect(()=>{if(user==null) router.push('/')},[])
    const handleClick=()=>{
        logOut()
        router.push('/IniciarSesion')
    }
    
    if(user==null) return null;

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