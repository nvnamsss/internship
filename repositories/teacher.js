const { Sequelize, DataTypes } = require('sequelize');

class TeacherReposity {
    constructor() {
        this.model = require('../models/teacher');
    }

    async getAll() {}

    async getById(id) {}

    async create(data) {}

    async update(id, data) {}

    async delete(id) {}
}

class teacherRepository extends TeacherReposity {
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
            return [result, undefined]
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

    async update(student) {
        return StudentRepository.update(student);
    }
}

function newTeacherRepository(sequelize) {
    return new teacherRepository(sequelize);
}


module.exports = {
    TeacherReposity,
    newTeacherRepository,
}