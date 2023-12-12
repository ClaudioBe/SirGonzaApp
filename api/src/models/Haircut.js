const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('haircut', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        image: {
            type: DataTypes.JSON,
            public_id: DataTypes.STRING,
            secure_url: DataTypes.STRING,
            allowNull: false,
        },
    },{timestamps:false})
}