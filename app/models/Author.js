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
    },
    fullname: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstname} ${this.lastname}`
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value !');
        }
    }
}, {
    sequelize,
    tableName: 'author'
});

module.exports = Author;