const {Router}= require('express');
const {appointmentRouter}=require('./appointmentRouter')
const {userRouter}=require('./userRouter')
const {haircutRouter}=require('./haircutRouter')
const {haircutTypeRouter}=require('./haircutTypeRouter');
const {CarouselImageRouter, carouselImageRouter}=require('./carouselImageRouter');

const router = Router();

router.use('/appointments',appointmentRouter)
router.use('/users', userRouter)
router.use('/haircuts',haircutRouter)
router.use('/haircutTypes',haircutTypeRouter)
router.use('/carouselImages',carouselImageRouter)

module.exports=router;