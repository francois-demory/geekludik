const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Designer extends Model {}

Designer.init({
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'designer'
});

module.exports = Designer;