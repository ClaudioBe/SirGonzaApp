const{DataTypes, Sequelize} = require('sequelize');

module.exports=(Sequelize)=>{
    Sequelize.define('carouselImage',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        image:{
            type:DataTypes.JSON,
            public_id:DataTypes.STRING,
            secure_url:DataTypes.STRING,
            allowNull:false
        }
    },{timestamps:false})
}