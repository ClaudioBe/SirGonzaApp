import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useSelector } from "react-redux";

const NavBar=()=>{
    const logged=useSelector(state=>state.isLogged);
    useEffect(()=>{},[logged])
    return (
        <div className={styles.container}>
            <Link to='/'>
                <p>Inicio</p>
            </Link>

            <Link to='/Cortes'>
                <p>Cortes</p>
            </Link>

            {!logged 
                ?<Link to='/Turnos'>
                    <p>Sacar Turno</p>
                </Link>
                :null}
                
            {logged
                ?(<Link to='/Admin/Panel'>
                    <p>SirGonza</p>
                </Link>) 
                :(<Link to='/IniciarSesion'>
                    <p>SirGonza</p>
                </Link>)}
        </div>
    )
}

export default NavBar;