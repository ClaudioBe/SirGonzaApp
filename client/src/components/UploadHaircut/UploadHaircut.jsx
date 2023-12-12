import React, { useState } from "react";
import { postHaircut } from "../../redux/actions";
import styles from './UploadHaircut.module.css';

const UploadHaircut=()=>{
    const[input,setInput]=useState({
        name:"",
        image:"" 
    })
    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const handleChangeImage=()=>{
        setInput({...input, image:e.target.files[0]});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        //tengo que pasarselo de esta manera para que cloudinary funcione
        const form=new FormData();
        form.append(name,input.name);
        form.append(image,input.image);
        postHaircut(form);
        setInput({
            name:"",
            image:""
        })
    }
    return(
        <form onSubmit={handleSubmit} className={styles.form}>
            <label>Nombre del corte:</label>
            <input type="text" name="name" onChange={handleChange}/> 
            <input type="file" name="image" onChange={handleChangeImage}/>
            <button>Subir</button>
        </form>
    )
}


export default UploadHaircut;