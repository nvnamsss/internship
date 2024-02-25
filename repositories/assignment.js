const { DataTypes, Sequelize } = require('sequelize');

class AssignmentRepository {
    async get(id) { }
    async create(obj) { }
    async update(obj) { }
    async batchCreate(obj) { }
}

class sequelizeAssignmentRepository extends AssignmentRepository {
    /**
     * 
     * @param {Sequelize} sequelize 
     */
    constructor(sequelize) {
        super()
        const model = sequelize.model('assignment');

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
            
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async create(obj) {
        try {
            const result = await this.model.create(obj);
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async batchCreate(assignemnts) {
        try {
            const result = await this.model.bulkCreate(assignemnts);
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async update(obj) {
        try {
            const result = await this.model.update({
                name: obj.name,
                verified: obj.verified,
            }, {
                where: {
                    id: obj.id
                }
            });

            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

}

/**
 * @param {Sequelize} sequelize 
 * @returns 
 */
function newSequelizeAssignmentRepository(sequelize) {
    return new sequelizeAssignmentRepository(sequelize);
}

module.exports = {
    AssignmentRepository,
    newSequelizeAssignmentRepository,
}