const {Appointment}=require('../db');

const getAppointments=async()=>{
    return Appointment.findAll();
}

const postAppointment=async({name,lastname,time,date})=>{
    const newAppointment=await Appointment.create({name,lastname,time,date});
    return newAppointment;
}

const putAppointment=async(id,updateAppointment)=>{
    console.log(id);
    const update=await Appointment.update(updateAppointment,{where:{id}})
    return update;
}

module.exports={
    getAppointments,postAppointment,putAppointment
}