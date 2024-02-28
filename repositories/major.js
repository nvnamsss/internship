const { DataTypes, Sequelize, Op } = require('sequelize');

class MajorRepository {
    async get(id) { }
    async search(req) { }
}

class sequelizeMajorRepository extends MajorRepository {
    /**
     * 
     * @param {Sequelize} sequelize 
     */
    constructor(sequelize) {
        super()
        const model = sequelize.model('major');

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

    async search(req) {
        try {
            let {cursor: cursor, page_size } = req;
            let query = {
                where : {
                    id: {
                        [Op.gte]: cursor
                    }
                },
                order: [['id', 'ASC']]
            }    

            if (page_size > 0) {
                query.limit = page_size;
            }

            const result = await this.model.findAll(query);

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
function newSequelizeMajorRepository(sequelize) {
    return new sequelizeMajorRepository(sequelize);
}


module.exports = {
    MajorRepository,
    newSequelizeMajorRepository,
}