const{DataTypes}=require('sequelize');

module.exports=(sequelize)=>{
    sequelize.define('haircutType',{
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        }
    },{timestamps:false})
}