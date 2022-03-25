const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Boardgame extends Model {}

Boardgame.init({
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    steam_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    appstore_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    playstore_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    bga_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    gamepark_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    picture_url: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'boardgame'
});

module.exports = Boardgame;