const { DataTypes, Sequelize, Op } = require("sequelize");

class ClassRepository {
    async get(id) { }
    async getByCode(code) { }
    async create(c) { }
    async update(c) { }
    async search(m) {}
}

class classRepository extends ClassRepository {
    /**
     * 
     * @param {Sequelize} sequelize 
     */
    constructor(sequelize) {
        super()
        const model = sequelize.model('class');

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

        /**
         * @type {Sequelize}
         */
        this.sequelize;
    }


    async get(id) {
        try {
            const result = await this.model.findOne({
                where: {
                    id: id
                },
                include: {
                    model: this.sequelize.model('assignment'),
                    as: 'assignments',
                }
            })
            return [result, undefined]
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
            })
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async search(m) {
        try {
            let {cursor: cursor, page_size } = m;

            const result = await this.model.findAll({
                limit: page_size,
                where: {
                    id: {
                        [Op.gte]: cursor
                    }
                },
                order: [['id', 'ASC']]
            });
            
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }


    async create(c) {
        try {
            const result = await this.model.create(c);
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async update(c) {
        try {
            const result = await this.model.update(c, {
                where: {
                    id: c.id
                }
            });
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }



}

function newSequelizeClassRepository(sequelize) {
    return new classRepository(sequelize);
}

module.exports = {
    ClassRepository,
    newSequelizeClassRepository,
}