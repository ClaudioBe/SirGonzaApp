"use client"
import React, { useEffect } from "react";
import Link from "next/link"
import { useSelector } from "react-redux";
import {HomeOutlined, ScissorOutlined , } from '@ant-design/icons';
import styles from '@/ui/NavBar.module.css'

const NavBar=()=>{
    const token=useSelector(state=>state.token);
   
    useEffect(()=>{},[token])
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className={`nav-link ${styles.link}`} href='/Turnos'>
                    <p className="text-success">Sacar Turno</p>
                </Link>
                
                <Link className={`nav-link ${styles.link}`} href={token!=null?'/Perfil':'/IniciarSesion'}>
                    <p className="text-success">Iniciar Sesion</p>
                </Link>
            </div>
        </nav>
    )
}

export default NavBar;