const {Router} =require('express');

const{logIn}=require('../controllers/usersControllers');

const userRouter=Router();

userRouter.post('/',async(req,res)=>{
    try {
        console.log(req.body);
        const result=await logIn(req.body.password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports={userRouter};