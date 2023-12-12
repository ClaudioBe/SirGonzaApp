const {Router}=require('express');

const{postHaircut,getAllHaircuts,getHaircutsForType}=require('../controllers/haircutsControllers');

const haircutRouter=Router();

haircutRouter.post('/',async(req,res)=>{
    try {
        const result=await postHaircut(req.body.name,req.files.image);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

haircutRouter.get('/',async(req,res)=>{
    try {
        const result = await getAllHaircuts();
        res.status(201).json(result);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

haircutRouter.get('/:haircutType',async(req,res)=>{
    try {
        const result=await getHaircutsForType(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports={haircutRouter};