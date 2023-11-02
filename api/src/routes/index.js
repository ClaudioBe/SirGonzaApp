const {Router}= require('express');
const {appointmentRouter}=require('./appointmentRouter')

const router = Router();

router.use('/appointments',appointmentRouter)

module.exports=router;