const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Review extends Model {}

Review.init({
    boardgame_reviewed: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    review_url: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'review'
});

module.exports = Review;