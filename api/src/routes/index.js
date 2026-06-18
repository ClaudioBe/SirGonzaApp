const {Router}= require('express');
const {appointmentRouter}=require('./appointmentRouter');
const {userRouter}=require('./userRouter');
const {notificationRouter}=require('./notificationRouter')

const router = Router();

router.use('/appointments',appointmentRouter)
router.use('/users', userRouter)
router.use('/notifications',notificationRouter)


module.exports=router;