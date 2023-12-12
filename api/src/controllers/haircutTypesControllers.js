const{HaircutTypes} =require('../db');


const getAllTypes=async()=>{
    return await HaircutTypes.findAll();
}

const getTypeById=async(id)=>{
    return await HaircutTypes.findByPk(id);
}

modules.exports={getAllTypes,getTypeById};