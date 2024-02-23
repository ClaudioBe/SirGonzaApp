const{HaircutType} =require('../db');


const getAllTypes=async()=>{
    return await HaircutType.findAll();
}

module.exports={getAllTypes};