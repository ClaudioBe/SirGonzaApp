const {Notification} =require('../db');


const getNotifications=async(id)=>{
    //traigo todas las notificaciones del usuario con el id del parametro
    //ordenadas descendentemente por el id para mostrar primero la mas nueva 
    return await Notification.findAll({where:{userId:id},order:[['id','DESC']]})
}

const deleteNotification=async(id)=>{
    return await Notification.destroy({where:{id}})
}

const deleteAllNotifications=async(id)=>{
    const deletedNotifications=await Notification.destroy({where:{userId:id}});
    if(deletedNotifications===0) throw Error("No hay notificaciones que eliminar")
    return `Se eliminaron ${deletedNotifications} registos de notificaciones`
}

module.exports={getNotifications,deleteNotification,deleteAllNotifications}