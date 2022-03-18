const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Author extends Model {}

Author.init({
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
    tableName: 'author'
});

module.exports = Author;