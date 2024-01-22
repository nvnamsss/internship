const { DataTypes } = require('sequelize');
const { REPORT_MODEL_NAME } = require('./const');

function defineReport(sequelize) {
    sequelize.define(REPORT_MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ref_id: DataTypes.STRING,
        class_id: DataTypes.INTEGER,
        assignment_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER,
        file: DataTypes.BLOB,
        url: DataTypes.STRING,
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
    defineReport,
}