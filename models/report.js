const { DataTypes } = require('sequelize');
const { REPORT_MODEL_NAME } = require('./const');

function defineReport(sequelize) {
    sequelize.define(REPORT_MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,

    })
}

module.exports = {
    defineReport,
}