const {Router}= require('express');
const {appointmentRouter}=require('./appointmentRouter');
const {userRouter}=require('./userRouter');
const {whatsappRouter}=require('./whatsappRouter')

const router = Router();

router.use('/appointments',appointmentRouter)
router.use('/users', userRouter)
router.use('/whatsapp',whatsappRouter)

module.exports=router;