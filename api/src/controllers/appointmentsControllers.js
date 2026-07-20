const {Appointment, Notification,User}=require('../db');
const{Op}=require('sequelize')
const {sendPush}=require('../utils/webPush');
const regexLetters = RegExp(/^[A-Za-z\s]+$/);
const regexNumbers= RegExp(/^[0-9]*$/)

const getAppointments=async()=>{
    //retorno todos los turnos, del mas viejo al mas nuevo
    return await Appointment.findAll({order:[["date_en",'ASC']]});
}

const postAppointment=async({name,lastname,phoneNumber,time,date_en,userId})=>{
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
        if(phoneNumber.length!=8) errors.phoneNumber="El numero debe ser de 8 digitos(sin el 11)";
        if(!regexNumbers.test(phoneNumber)) errors.phoneNumber="Debe ingresar solo numeros"
    }

    if(time=="") errors.time="Debe elegir un horario";

    if(date_en=="") errors.date="Debe elegir una fecha";
    

    if(Object.keys(errors).length)throw Error(JSON.stringify(errors));
    
    phoneNumber=`54911${phoneNumber}`;
    
    // //formateo la fecha a: dd/mm
    const date_es=format(new Date(date_en),'es')
    // const message=`¡Hola ${name}! Tu solicitud de turno para el ${date_es} a las ${time}\
    // ha sido recibida con éxito. A la brevedad se confirmará tu turno. Muchas Gracias 👋`
    // sendWhatsapp(phoneNumber,message)

    //se guarda el turno en la bbdd
    const newAppointment=await Appointment.create({name,lastname,time,phoneNumber,date_en,date_es,userId});
    //Encuentro al admin 
    const admin = await User.findOne({ where: {admin:true} });

    const title="¡Nueva solicitud de Turno!";
    const message=`Cliente: ${name} ` + lastname

    //envio al admin la notificacion
    if(admin.pushSubscription)await sendPush(admin.pushSubscription,title,message );

    //guardo la notificacion en la bbdd
    await Notification.create({title,message,userId:admin.id})
    return newAppointment;
}

const putAppointment=async(updateAppointment,id)=>{
    const update=await Appointment.update(updateAppointment,{where:{id}});
    const appointment= await Appointment.findOne({where:{id}})   

    if(appointment.userId && updateAppointment.confirmed){
        const user = await User.findByPk(appointment.userId);
        if(user && user.pushSubscription){
            const message=`Tu turno del ${appointment.date_es} a las ${time}hs fue confirmado`;
            const title="¡Turno Confirmado!";

            //guardo la notificacion en la bbdd
            await Notification.create({title,message,userId:user.id})
            await sendPush(user.pushSubscription,title, message)
        }
    }
    console.log(JSON.stringify(updateAppointment));
    
    // if(updateAppointment.confirmed==true) await sendWhatsapp({phoneNumber,message:`Turno del ${date_es} a las ${time} aceptado!`})
    return update;
}

const deleteAppointment=async(id)=>{ 
    const appointmentToDelete=await Appointment.findByPk(id)
    if(appointmentToDelete) await Appointment.destroy({where:{id}})
    else throw Error(`No existe registro de turno con el id ${id}`);

    return `El turno ${id} ha sido eliminado`;
}
const deleteAllAppointments=async()=>{
    const deletedRegisters=await Appointment.destroy({where:{}});
    if(deletedRegisters===0)throw Error("No existen registros de turnos");
    return `${deletedRegisters} registros de turnos han sido eliminados`;
}

const deleteOldAppointments=async()=>{
    //instancio un objeto tipo date
    const limitDate= new Date()
    //le resto 30 dias
    limitDate.setDate(limitDate.getDate() - 30)
    //lo parseo a string y lo divido para agarrar solo la fecha
    const dateString= limitDate.toISOString().split('T')[0];
    
    //destroy retorna la cantidad de registros eliminados
    const deletedRegisters=await Appointment.destroy({where:{date_en:{[Op.lt]:dateString}}});
    if(deletedRegisters===0) throw Error("No existen registros de turnos antiguos ")

    return `${deletedRegisters} registros de turnos han sido eliminados`;
}

//para formatear la fecha de 'en' a 'es'
const format=(date,locale)=> {
    //al formatearla se le resta un dia, por eso...
    date.setDate(date.getDate()+1);
    //para que solo devuelva dia y mes
    const options = {
        day:"numeric",
        month:"numeric",
    }
    return new Intl.DateTimeFormat(locale,options).format(date);
};


module.exports={
    getAppointments,postAppointment,putAppointment,deleteAppointment,deleteAllAppointments, deleteOldAppointments
}