const {DataTypes, Sequelize, DATE, NOW}=require('sequelize');

module.exports= (Sequelize)=>{
    Sequelize.define('appointment',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        time:{
            type: DataTypes.TIME
        },
        date:{
            type:DataTypes.DATEONLY,
            defaultValue:NOW
        },
        confirmed:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }

    },{timestamps:false})
}