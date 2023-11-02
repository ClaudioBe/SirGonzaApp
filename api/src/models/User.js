const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{timestamps:false})
}