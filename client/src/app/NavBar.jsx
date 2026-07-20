"use client"
import React, { useEffect } from "react";
import Link from "next/link"
import { useSelector } from "react-redux";
import styles from '@/ui/NavBar.module.css'

const NavBar=()=>{
    const user=useSelector(state=>state.user.user);
   
    if(user)return null;
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className={`nav-link ${styles.link}`} href='/Turnos'>
                    <p className="text-success">Sacar Turno</p>
                </Link>

                <Link href='/'>
                    <img className={styles.img} src='/assets/icon.png' alt="" />  
                </Link>

                <Link className={`nav-link ${styles.link}`} href='/IniciarSesion'>
                    <p className="text-success">Iniciar Sesión</p>
                </Link>
            </div>
        </nav>
    )
}

export default NavBar;