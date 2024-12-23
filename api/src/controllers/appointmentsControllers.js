const {Appointment}=require('../db');

const getAppointments=async()=>{
    return await Appointment.findAll();
}

const postAppointment=async({name,lastname,phoneNumber,time,date_en})=>{
    const errors={}

    if(name=="") errors.name="Debe ingresar su nombre";
    else{
        if(!regexLetters.test(name))errors.name="El nombre solo debe contener letras";
        if(name.length<3)errors.name="Nombre demasiado corto";
        if(name.length>15) errors.name="Nombre demasiado largo";
    } 
    
    if(lastname=="") errors.lastname="Debe ingresar su apellido";
    else{
        if(!regexLetters.test(lastname))errors.lastname="El apellido solo debe contener letras";
        if(lastname.length<3)errors.lastname="Apellido demasiado corto";
        if(lastname.length>15) errors.lastname="Apellido demasiado largo";
    } 

    if(phoneNumber=="") errors.phoneNumber="Debe ingresar su numero de celular";
    else {
        if(phoneNumber.length!=8) errors.phoneNumber="Debe ingresar 6 digitos";
    }

    if(time=="") errors.time="Debe elegir un horario";

    if(date_en=="") errors.date="Debe elegir una fecha";

    if(Object.keys(errors).length)throw Error(JSON.stringify(errors));
    
    //formateo la fecha a: dd/mm/aa
    const date_es=format(new Date(date_en),'es').substring(0,4);
    sendWhatsapp(phoneNumber,`¡Hola ${name}! Tu solicitud de turno para el ${date_es} a las ${time}\
    ha sido recibida con éxito. A la brevedad se confirmará tu turno. Muchas Gracias 👋`)

    const newAppointment=await Appointment.create({name,lastname,time:time.substring(0,5),phoneNumber,date_en,date_es});
    return newAppointment;
}

const putAppointment=async(id,updateAppointment)=>{
    const update=await Appointment.update(updateAppointment,{where:{id}})
    return update;
}

const deleteAppointment=async(id)=>{
    const appointmentToDelete=await Appointment.findByPk(id)
    if(appointmentToDelete) await Appointment.destroy({where:{id}})
    else throw Error(`No existe registro de turno con el id ${id}`);

    return `El turno ${id} ha sido eliminado`;
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