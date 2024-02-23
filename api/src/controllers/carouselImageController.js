const{CarouselImage}=require('../db');
const { uploadImage, deleteImage } = require('../utils/cloudinary');
const fs=require('fs-extra');

const getCarouselImages=async()=>{
    return await CarouselImage.findAll();
}

const postCarouselImage=async(images)=>{
    const results=await Promise.all(images.map(img=> uploadImage(img.tempFilePath)));
    await images.forEach(img => fs.remove(img.tempFilePath))
    return results.map(async img=>{await CarouselImage.create({image:{public_id:img.public_id,secure_url:img.secure_url}})});
}

const deleteCarouselImage=async(id)=>{
    const imageToDelete=await CarouselImage.findByPk(id);
    if(imageToDelete){
        await deleteImage(imageToDelete.image.public_id);
        await CarouselImage.destroy({where:{id}});
    }
    
    else throw Error(`No existe una imagen con el id ${id}`) ;

    return `La imagen ${id} ha sido eliminada`
}

module.exports={getCarouselImages,postCarouselImage,deleteCarouselImage};

