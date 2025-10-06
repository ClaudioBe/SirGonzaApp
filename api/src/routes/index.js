const {Router}= require('express');
const {appointmentRouter}=require('./appointmentRouter');
const {userRouter}=require('./userRouter');

const router = Router();

router.use('/appointments',appointmentRouter)
router.use('/users', userRouter)

module.exports=router;