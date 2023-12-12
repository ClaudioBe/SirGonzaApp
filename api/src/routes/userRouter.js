const {Router} =require('express');

const{login}=require('../controllers/usersControllers');

const userRouter=Router();

userRouter.post('/',async(req,res)=>{
    try {
        const result=await login(req.body.password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports={userRouter};