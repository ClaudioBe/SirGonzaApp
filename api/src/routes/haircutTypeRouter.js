const {Router}=require('express');

const{getAllTypes,getTypeById}=require('../controllers/haircutTypesControllers');

const haircutTypeRouter=Router();

haircutTypeRouter.get('/',async(req,res)=>{
    try {
        const allHaircutsTypes=await getAllTypes();
        res.status(200).json(allHaircutsTypes);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

haircutTypeRouter.get('/:id',async(req,res)=>{
    try {
        const haircutType=await getTypeById(req.params.id);
        res.status(200).json(haircutType);
    } catch (error) {
        res.status(404).send(error.message);
    }
})
