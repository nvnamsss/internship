const { DataTypes } = require('sequelize');
const Values = require('./const');

function defineClass(sequelize) {
    sequelize.define(Values.CLASS_MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        data: DataTypes.JSON,
    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: false
    });

    sequelize.define(Values.CLASS_STUDENT_MODEL_NAME, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        class_id: DataTypes.INTEGER,
        student_id: DataTypes.INTEGER
    }, {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    });
}

function defineClassAssociation(sequelize) {
    const class_model = sequelize.model(Values.CLASS_MODEL_NAME);
    const assigment_model = sequelize.model(Values.ASSIGNMENT_MODEL_NAME);
    const student_model = sequelize.model(Values.STUDENT_MODEL_NAME);
    const class_student_model = sequelize.model(Values.CLASS_STUDENT_MODEL_NAME);

    class_model.hasMany(assigment_model, { foreignKey: 'class_id', sourceKey: 'id' });
    class_model.belongsToMany(student_model, { through: class_student_model, foreignKey: 'class_id', sourceKey: 'id' });
    student_model.belongsToMany(class_model, { through: class_student_model, foreignKey: 'student_id', sourceKey: 'id' });
}

module.exports = {
    defineClass,
    defineClassAssociation,
}