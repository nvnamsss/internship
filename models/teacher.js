const { DataTypes } = require('sequelize');
const { TEACHER_MODEL_NAME } = require('./const');

function defineTeacher(sequelize) {
    sequelize.define(TEACHER_MODEL_NAME, {
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
        deleted_at: DataTypes.DATE,
    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: false
    });
}

module.exports = {
    defineTeacher,
}