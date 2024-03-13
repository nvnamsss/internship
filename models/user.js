const { DataTypes } = require('sequelize');
const { USER_MODEL_NAME } = require('./const');

const ROLES = {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student'
}

const ROLEID2ROLE = {
    1: ROLES.ADMIN,
    2: ROLES.TEACHER,
    3: ROLES.STUDENT
}

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
    ROLES,
    ROLEID2ROLE
}