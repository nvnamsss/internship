const { DataTypes } = require('sequelize');
const { MAJOR_MODEL_NAME } = require('./const');

function defineMajor(sequelize) {
    sequelize.define(MAJOR_MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        data: DataTypes.JSON,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: false
    });
}

module.exports = {
    defineMajor,
}