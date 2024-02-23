const {Appointment}=require('../db');

const getAppointments=async()=>{
    return await Appointment.findAll();
}

const postAppointment=async({name,lastname,time,date_en})=>{
    const date= new Date(date_en);
    //formateo la fecha a: dd/mm/aa
    const date_es=format(new Date(date_en),'es');
    
    const newAppointment=await Appointment.create({name,lastname,time,date_en,date_es});
    return newAppointment;
}

const putAppointment=async(id,updateAppointment)=>{
    const update=await Appointment.update(updateAppointment,{where:{id}})
    return update;
}

const deleteAppointment=async(id)=>{
    const appointmentToDelete=await Appointment.findByPk(id)
    if(appointmentToDelete) await Appointment.destroy({where:{id}})
    else throw Error(`No existe registro de Appointment con el id ${id}`);

    return `El appointment ${id} ha sido eliminado`;
}

//para formatear la fecha de 'en' a 'es'
const format=(date,locale,options)=> {
    //al formatearla se le resta un dia, por eso...
    date.setDate(date.getDate()+1);
    return new Intl.DateTimeFormat(locale,options).format(date);
};

module.exports={
    getAppointments,postAppointment,putAppointment,deleteAppointment
}