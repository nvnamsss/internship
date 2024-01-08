const { DataTypes } = require('sequelize');
const Values = require('./const');

function defineMeeting(sequelize) {
    sequelize.define(Values.MEETING_MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        class_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER,
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: false
    });
}

module.exports = {
    defineMeeting,
}