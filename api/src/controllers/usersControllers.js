const {User}=require('../db');

const login=async(password)=>{
    const user=await User.findOne({where:{password}})
    if(user) return "OK";
    throw Error("Contraseña Incorrecta");
}

module.exports={
    login
}