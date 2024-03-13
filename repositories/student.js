const { DataTypes, Sequelize, Op } = require('sequelize');
const ErrorList = require('../errors/list')
const cache = require('memory-cache');

class StudentRepository {
    async get(id) {}
    async getByIDs(ids) {}
    async getByCode(code) {}
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

            return [result.dataValues, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async getByIDs(ids) {
        try {
            let students = [];
            let query_ids = [];
            ids.forEach(id => {
                let student = cache.get(`student_${id}`);
                if (student !== null && student !== undefined) {
                    students.push(cache.get(`student_${id}`));
                } else {
                    query_ids.push(id);
                }
            });
            
            if (query_ids.length === 0) {
                return [students, undefined]
            }

            const result = await this.model.findAll({
                where: {
                    id : {
                        [Op.in]: query_ids
                    }
                }
            });
            
            result.forEach(student => {
                cache.put(`student_${student.id}`, student.dataValues, 1000 * 60 * 30);    
                students.push(student.dataValues);
            });

            return [students, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async getByCode(code) {
        try {
            const result = await this.model.findOne({
                where: {
                    code: code
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

    async update(student) {
        try {
            const result = await this.model.update({
                name: student.name,
                data: student.data,
            }, {
                where: {
                    id: student.id
                }
            });
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

}


function newSequelizeStudentRepository(sequelize) {
    return new sequelizeStudentRepository(sequelize);
}

module.exports = {
    StudentRepository,
    newSequelizeStudentRepository,
}