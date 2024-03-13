const { DataTypes } = require('sequelize');
const { ASSIGNMENT_MODEL_NAME } = require('./const');

function defineAssignment(sequelize) {
    sequelize.define(ASSIGNMENT_MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        class_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        data: DataTypes.JSON,
        verified: DataTypes.BOOLEAN,
    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: false
    })
}

module.exports = {
    defineAssignment,
}