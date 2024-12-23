const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type: DataTypes.STRING,
        },
        lastname:{
            type:DataTypes.STRING,
        },
        userName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        phoneNumber:{
            type:DataTypes.STRING,
        },
        admin:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{timestamps:false})
}