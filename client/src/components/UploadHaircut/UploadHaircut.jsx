import React, { useEffect, useState } from "react";
import { postHaircut } from "../../redux/actions/haircutActions";
import styles from './UploadHaircut.module.css';
import { useDispatch } from "react-redux";
import swal from 'sweetalert2'

const UploadHaircut=()=>{
    const[input,setInput]=useState({
        name:"",
        images:""
    })
    const [submittedForm,setSubmittedForm]=useState(false);
    
    
    const dispatch=useDispatch();
    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const handleChangeImage=(e)=>{
        setInput({...input, images:e.target.files});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        //tengo que pasarselo de esta manera para que cloudinary funcione
    
        const form=new FormData();
        form.append("name",input.name);
        //itero por cada archivo en el objeto FileList para agregar cada imagen al formulario
        for (let i = 0; i < input.images.length; i++) form.append("images", input.images[i]);
       
        dispatch(postHaircut(form));
        swal.fire({
            title:"Se ha subido el corte!",
            icon: 'success',
            timer:2000,
            showConfirmButton:false,
            iconColor:'#888888'
        })
        
        setInput({
            name:"",
            images:""
        })
        setSubmittedForm(true);
    }
    return(
        <form key={submittedForm} onSubmit={handleSubmit} className={styles.form}>
            <label>Nombre del corte:</label>
            <input type="text" name="name" onChange={handleChange} required={true}/> 
            <input type="file" name="images" required={true} onChange={handleChangeImage} multiple/>
            <button type="submit">Subir</button>
        </form>
    )
}


export default UploadHaircut;