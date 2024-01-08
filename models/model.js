const { defineAssignment } = require('./assigment');
const { defineUser } = require('./user');
const { defineClass, defineClassAssociation } = require('./class');
const { defineReport } = require('./report');
const { defineTeacher } = require('./teacher');
const { defineStudent } = require('./student');

function DefineModel(sequelize) {
    defineAssignment(sequelize);
    defineUser(sequelize);
    defineClass(sequelize);
    defineReport(sequelize);
    defineTeacher(sequelize);
    defineStudent(sequelize);

    defineClassAssociation(sequelize);
}

module.exports = {
    DefineModel,
}