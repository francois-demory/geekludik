const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Editor extends Model {}

Editor.init({
    editor_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'editor'
});

module.exports = Editor;