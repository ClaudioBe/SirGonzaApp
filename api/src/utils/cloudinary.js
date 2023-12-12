const {v2}=require('cloudinary');
const{CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET}=process.env

//funcion para subir la imagen a cloudinary
const uploadImage= async(filePath)=>{
    return await v2.uploader.upload(filePath,{
        //nombre de la carpeta en cloudinary
        folder : 'Haircuts'
    })
}

//funcion para borrar la imagen de cloudinary
const deleteImage= async(id)=>{
    return await v2.uploader.destroy(id)
}

v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET,
    secure:true
})


module.exports={uploadImage,deleteImage}