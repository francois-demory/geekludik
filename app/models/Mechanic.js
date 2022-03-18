const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Mechanic extends Model {}

Mechanic.init({
    mechanic: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'mechanic'
});

module.exports = Mechanic;