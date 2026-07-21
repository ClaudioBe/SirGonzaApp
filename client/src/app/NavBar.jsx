"use client"
import React from "react";
import Link from "next/link"
import styles from '@/ui/NavBar.module.css'
import { usePathname } from "next/navigation";

const NavBar=()=>{
    const pathname= usePathname();

    if(pathname==="/Perfil")return null;
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className={`nav-link ${styles.link}`} href='/Turnos'>
                    <p className="text-success">Solicitar Turno</p>
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