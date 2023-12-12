import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar=()=>{
    return (
        <div className={styles.container}>
            <img src="" alt="" />
            <Link to='/'>
                <p>Inicio</p>
            </Link>
            <Link to='/Turnos'>
                <p>Sacar Turno</p>
            </Link>
            <Link to='/IniciarSesion'>
                <p>SirGonza</p>
            </Link>
        </div>
    )
}

export default NavBar;