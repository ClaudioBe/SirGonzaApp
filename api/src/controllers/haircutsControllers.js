const {Haircut, HaircutType}=require('../db');
const {uploadImage, deleteImage}=require('../utils/cloudinary');
const fs=require('fs-extra');

const postHaircut=async(name,imgs)=>{
    //uso promise.all para que resuelva todas las promesas y devuelva un array a partir del array de 
    //la funcion map con lo que retorna la funcion uploadImage por cada imaagen
    const results=await Promise.all(imgs.map(img=> uploadImage(img.tempFilePath)));
    
    //elimino de la carpeta uploads los archivos temporales de cada imagen
    await imgs.forEach(async img=>await fs.remove(img.tempFilePath))
    //creo un array el cual va a contener solo las props necesarias de cada imagen
    const images=results.map(img=>{return {public_id:img.public_id,secure_url:img.secure_url}})

    const type=await HaircutType.findOrCreate({where:{name}})
    const newHaircut=await Haircut.create({images,haircutTypeName:type[0].dataValues.name});
    return newHaircut;
}

const getAllHaircuts=async()=>{
    return await Haircut.findAll();
}

const getHaircutsForType=async({haircutType})=>{
    return await Haircut.findAll({where:{haircutType}});
}

const deleteHaircut=async(id)=>{
    const haircutToDelete=await Haircut.findByPk(id);
    if(haircutToDelete){
        //para borrar las imagenes de cloudinary
        haircutToDelete.images.forEach(async img=>await deleteImage(img.public_id))
        await Haircut.destroy({where:{id}})
    }
    else throw Error(` No existe un registro de haircut con el id ${id}`);
    
    return `El haircut ${id} ha sido eliminado`;
}

module.exports={postHaircut,getAllHaircuts,getHaircutsForType, deleteHaircut};