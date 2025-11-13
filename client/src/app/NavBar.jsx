"use client"
import React, { useEffect } from "react";
import Link from "next/link"
import { useSelector } from "react-redux";
import styles from '@/ui/NavBar.module.css'

const NavBar=()=>{
    const admin=useSelector(state=>state.user.admin);
   
    if(admin)return null;
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className={`nav-link ${styles.link}`} href='/Turnos'>
                    <p className="text-success">Sacar Turno</p>
                </Link>
                
                <Link className={`nav-link ${styles.link}`} href='/IniciarSesion'>
                    <p className="text-success">Iniciar Sesion</p>
                </Link>
            </div>
        </nav>
    )
}

export default NavBar;