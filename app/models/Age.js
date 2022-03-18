const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Age extends Model {}

Age.init({
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'age'
});

module.exports = Age;