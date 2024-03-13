const { DataTypes, Sequelize, Op } = require("sequelize");

class ClassRepository {
    async get(id) { }
    async getWithStudent(id) { }
    async getByCode(code) { }
    async create(c) { }
    async update(c) { }
    async search(m) { }
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
                include: [
                    {
                        model: this.sequelize.model('assignment'),
                        as: 'assignments',
                    },
                    {
                        model: this.sequelize.model('major'),
                        as: 'major',
                    }
                ]
            })
            return [result.dataValues, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async getWithStudent(id) {
        try {
            const result = await this.model.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: this.sequelize.model('assignment'),
                        as: 'assignments',
                    },
                    {
                        model: this.sequelize.model('major'),
                        as: 'major',
                    }
                ]
            })
            return [result.dataValues, undefined]
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
            return [result.dataValues, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async search(req) {
        try {
            let { cursor: cursor, page_size, major_id } = req;
            let query = {
                where: {
                    id: {
                        [Op.gte]: cursor
                    }
                },
                order: [['id', 'ASC']],
                include: [
                    {
                        model: this.sequelize.model('major'),
                        as: 'major',
                    }
                ]
            };

            if (page_size > 0) {
                query.limit = page_size;
            }
            
            if (major_id > 0) {
                query.where.major_id = {
                    [Op.eq]: major_id
                };
            }

            const result = await this.model.findAll(query);

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