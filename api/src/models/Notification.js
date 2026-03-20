const {DataTypes, NOW}=require('sequelize');

module.exports= (Sequelize)=>{
    Sequelize.define('notification',{
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING
        },
        message:{
            type: DataTypes.STRING
        },
        isRead:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        userId:{
            type: DataTypes.BIGINT,
            allowNull:true
        }
    },{timestamps:false})
}