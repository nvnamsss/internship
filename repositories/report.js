const { Sequelize, DataTypes } = require("sequelize");

class ReportRepository {
    async get(id) {}
    async create(report) {}
    async update(report) {}
}

class sequelizeReportRepository extends ReportRepository {
    /**
     * 
     * @param {Sequelize} sequelize 
     */
    constructor(sequelize) {
        super()
        const model = sequelize.model('report');

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

    async create(report) {
        try {
            const result = await this.model.create(report);
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async update(report) {
        try {
            const result = await this.model.update(report, {
                where: {
                    id: report.id
                }
            });
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }
}

function newSequelizeReportRepository(sequelize) {
    return new sequelizeReportRepository(sequelize);
}

module.exports = {
    ReportRepository,
    newSequelizeReportRepository,
}