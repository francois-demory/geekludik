const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Rule extends Model {}

Rule.init({
    boardgame_related: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    rule_url: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'rule'
});

module.exports = Rule;