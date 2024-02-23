const {Router}=require('express');

const{postHaircut,getAllHaircuts,getHaircutsForType,deleteHaircut}=require('../controllers/haircutsControllers');

const haircutRouter=Router();

haircutRouter.post('/',async(req,res)=>{
    try {
        const result=await postHaircut(req.body.name,req.files.images);
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

haircutRouter.delete("/:id",async(req,res)=>{
    try {
        const deleted=await deleteHaircut(req.params.id);
        res.status(201).json(deleted)
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports={haircutRouter};