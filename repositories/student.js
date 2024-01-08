const { DataTypes, Sequelize } = require('sequelize');
const ErrorList = require('../errors/list')

class StudentRepository {
    async get(id) {}
    async create(student) {}
    async update(student) {}
}

class sequelizeStudentRepository extends StudentRepository {
    /**
     * 
     * @param {Sequelize} sequelize 
     */
    constructor(sequelize)  {
        super()
        const model = sequelize.model('student');

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
            });
            
            if (result === null) {
                return [undefined, ErrorList.ErrorStudentNotFound];
            }

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

    update(student) {
        return StudentRepository.update(student);
    }

}


function newSequelizeStudentRepository(sequelize) {
    return new sequelizeStudentRepository(sequelize);
}

module.exports = {
    StudentRepository,
    newSequelizeStudentRepository,
}