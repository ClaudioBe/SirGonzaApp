const {User}=require('../db');

const logIn=async(password)=>{
    const user=await User.findOne({where:{password}})
    return user?true:false;
}

module.exports={
    logIn
}