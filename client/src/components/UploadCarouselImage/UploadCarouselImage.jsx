import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCarouselImage } from '../../redux/actions/carouselImageActions';
import swal from 'sweetalert2';

function UploadCarouselImage() {
    const[images,setImages]=useState('');

    const dispatch=useDispatch();

    const handleInput=(e)=>{
        setImages(e.target.files);
    }

    const handleSubmit=()=>{
        let form = new FormData();
        //itero por cada archivo en el objeto FileList para agregar cada imagen al formulario
        for (let i = 0; i < images.length; i++) form.append("images", images[i]);
        dispatch(postCarouselImage(form));
        
        swal.fire({
            title:images.length>1?"Imagenes subidas!":"Imagen subida!",
            icon: 'error',
            timer:2000,
            showConfirmButton:false,
            iconColor:'#888888'
        }) 
    }
    
    return (
        <div>
            <input type="file" multiple onChange={handleInput} required />
            <button onClick={handleSubmit}></button>
        </div>
    );
}

export default UploadCarouselImage;