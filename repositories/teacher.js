const { Sequelize, DataTypes } = require('sequelize');
const ErrorList = require('../errors/list');

class TeacherRepository {
    constructor() {
        this.model = require('../models/teacher');
    }

    async getAll() {}

    async getById(id) {}

    async create(data) {}

    async update(id, data) {}

    async delete(id) {}
}

class teacherRepository extends TeacherRepository {
    /**
     * 
     * @param {Sequelize} sequelize 
     */
    constructor(sequelize) {
        super()
        const model = sequelize.model('teacher');

        Object.defineProperties(this, {
            sequelize: {
                value: sequelize,
                writable: false
            },
            model: {
                value: model,
                writable: false
            }
        });
    }

    async get(id) {
        try {
            const result = await this.model.findOne({
                where: {
                    id: id
                }
            })

            if (result === null) {
                return [undefined, ErrorList.ErrorNotFound];
            }

            return [result.dataValues, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async create(student) {
        try {
            const result = await this.model.create(student);
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async update(teacher) {
        try {
            const result = await this.model.update({
                name: teacher.name,
                data: teacher.data,
            }, {
                where: {
                    id: teacher.id
                }
            });
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }
}

function newSequelizeTeacherRepository(sequelize) {
    return new teacherRepository(sequelize);
}


module.exports = {
    TeacherRepository,
    newSequelizeTeacherRepository,
}