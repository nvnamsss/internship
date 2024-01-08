const { DataTypes } = require('sequelize');
const { TEACHER_MODEL_NAME } = require('./const');

function defineTeacher(sequelize) {
    sequelize.define(TEACHER_MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
    });
}

module.exports = {
    defineTeacher,
}