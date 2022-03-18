const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Duration extends Model {}

Duration.init({
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'duration'
});

module.exports = Duration;