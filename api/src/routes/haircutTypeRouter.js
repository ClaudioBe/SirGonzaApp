const {Router}=require('express');

const{getAllTypes}=require('../controllers/haircutTypesControllers');

const haircutTypeRouter=Router();

haircutTypeRouter.get('/',async(req,res)=>{
    try {
        const allHaircutsTypes=await getAllTypes();
        res.status(200).json(allHaircutsTypes);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports={haircutTypeRouter}