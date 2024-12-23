const {Router}=require('express');

const{
    getAppointments,
    putAppointment,
    postAppointment,
    deleteAppointment
} = require('../controllers/appointmentsControllers')

const {verifyTokenAdmin}=require('../middlewares/authJwt');
const appointmentRouter=Router();

appointmentRouter.get('/',async(req,res)=>{
    try {
        const appointment = await getAppointments();
        res.status(200).json(appointment);
    } catch (error) {
        res.status(404).send(error.message)
    }
});

appointmentRouter.post('/',async(req,res)=>{
    try {
        const addAppointment=await postAppointment(req.body);
        res.status(201).json(addAppointment)
    } catch (error) {
        res.status(400).json(JSON.parse(error.message));
    }
})
appointmentRouter.put('/:id/:token',async(req,res)=>{
    try {
        const updateAppointment=await putAppointment(req.params.id,req.body);
        res.status(200).json(updateAppointment);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

appointmentRouter.delete('/:id/:token',verifyTokenAdmin,async(req,res)=>{
    try {
        const deleted=await deleteAppointment(req.params.id);
        res.status(201).json(deleted)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports={appointmentRouter};