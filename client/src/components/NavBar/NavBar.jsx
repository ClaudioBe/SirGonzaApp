import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {HomeOutlined, ScissorOutlined , } from '@ant-design/icons';
import styles from './NavBar.module.css';

const NavBar=()=>{
    const token=useSelector(state=>state.token);
    const admin=useSelector(state=>state.admin);
    useEffect(()=>{},[token])
    return ( 
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <Link class={`nav-link ${styles.link}`} to='/'>
                    <p class="text-success">Inicio</p>
                </Link>

                {!admin 
                    ?<Link class={`nav-link ${styles.link}`} to='/Turnos'>
                        <p class="text-success">Sacar Turno</p>
                    </Link>
                    :null}
                
                
                <Link class={`nav-link ${styles.link}`} to={token!=null?'/Perfil':'/IniciarSesion'}>
                    <p class="text-success">{token!=null?"Mi Perfil":"Iniciar Sesion"}</p>
                </Link>
                   
            </div>
        </nav>
    )
}

export default NavBar;