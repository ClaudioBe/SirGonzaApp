const {Router}=require('express');
const {getCarouselImages,postCarouselImage,deleteCarouselImage}=require('../controllers/carouselImageController');

const carouselImageRouter=Router();

carouselImageRouter.get('/',async(req,res)=>{
    try {
        const images=await getCarouselImages();
        res.status(201).json(images);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

carouselImageRouter.post('/',async(req,res)=>{
    try {
        const newImages=await postCarouselImage(req.files.images);
        res.status(200).json(newImages);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

carouselImageRouter.delete('/:id',async(req,res)=>{
    try {
        const deletedImage=await deleteCarouselImage(req.params.id);
        res.status(200).json(deletedImage);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports={carouselImageRouter};