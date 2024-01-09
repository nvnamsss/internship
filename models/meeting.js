const { DataTypes } = require('sequelize');
const Values = require('./const');

function defineMeeting(sequelize) {
    sequelize.define(Values.MEETING_MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        class_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER,
        teacher_id: DataTypes.INTEGER,
        from: DataTypes.DATE,
        to: DataTypes.DATE,
        room: DataTypes.STRING,
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