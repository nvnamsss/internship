const { DataTypes } = require('sequelize');
const { USER_MODEL_NAME } = require('./const');

function defineUser(sequelize) {
    sequelize.define(USER_MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        activated: DataTypes.BOOLEAN,
        role_id: DataTypes.INTEGER,
        binding: {
            type: DataTypes.INTEGER,
            set(value) {
                this.setDataValue('binding', value);
            }
        },
    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: false
    })
}

module.exports = {
    defineUser,
}