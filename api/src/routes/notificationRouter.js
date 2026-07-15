const {Router}=require('express');
const{verifyTokenUser}=require('../middlewares/authJwt.js')
const{
    getNotifications,
    deleteNotification,
    deleteAllNotifications

} = require('../controllers/notificationsControllers.js');


const notificationRouter=Router();

notificationRouter.get('/:userId',async(req,res)=>{
    try {
        const notifications = await getNotifications(req.params.userId);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(404).send(error.message)
    }
});


notificationRouter.delete('/:id',verifyTokenUser,async(req,res)=>{
    try {
        const deleted=await deleteNotification(req.params.id);
        res.status(201).json(deleted)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

notificationRouter.delete('/all/:userId',verifyTokenUser,async(req,res)=>{
    try {
        const deleted=await deleteAllNotifications(req.params.userId);
        res.status(201).json(deleted)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports={notificationRouter};