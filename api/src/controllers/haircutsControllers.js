const {Haircut, HaircutType}=require('../db');
const {uploadImage, deleteImage}=require('../utils/cloudinary');
const fs=require('fs-extra');

const postHaircut=async(name,image)=>{
    //invoco la funcion para subir la imagen a cloudinary
    const result=await uploadImage(image.tempFilePath);
    await fs.remove(image.tempFilePath);
    const type=await HaircutType.findOrCreate({where:{name}});
    console.log(type);
    const newHaircut=await Haircut.create({image:{public_id:result.public_id,secure_url:result.secure_url},
                                            haircutTypeId:type[0].dataValues.id});
    return newHaircut;
}

const getAllHaircuts=async()=>{
    return await Haircut.findAll();
}

const getHaircutsForType=async({haircutType})=>{
    return await Haircut.findAll({where:{haircutType}});
}

module.exports={postHaircut,getAllHaircuts,getHaircutsForType};