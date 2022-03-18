const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Player extends Model {}

Player.init({
    player: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'player'
});

module.exports = Player;