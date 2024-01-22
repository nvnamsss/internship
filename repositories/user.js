const { Sequelize, DataTypes } = require("sequelize");
const ErrorList = require("../errors/list");

class UserRepository {
    async create(user) {}

    async updateBinding(user) {}

    async delete(user) {}

    async find(user) {}
}

class sequelizeUserRepository extends UserRepository {
    /**
     * 
     * @param {Sequelize} sequelize 
     */
    constructor(sequelize) {
        super()
        const model = sequelize.model('user');

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

    async getByID(id) {
        try {
            const result = await this.model.findOne({
                where: {
                    id: id
                }
            })

            if (!result) {
                return [undefined, ErrorList.ErrorNotFound];
            }

            return [result, undefined];
        } catch (err) {
            console.log(err);
            return [undefined, err];
        }
    }

    async getByUsername(username) {
        try {
            const result = await this.model.findOne({
                where: {
                    username: username
                }
            })

            if (!result) {
                return [undefined, ErrorList.ErrorNotFound];
            }

            console.log(result.password)
            return [result, undefined];
        } catch (err) {
            console.log(err);
            return [undefined, err];
        }
    
    }

    async getByRefreshToken(token) {
        try {
            const result = await this.model.findOne({
                where: {
                    refresh_token: token
                }
            })

            if (!result) {
                return [undefined, ErrorList.ErrorNotFound];
            }

            return [result, undefined];
        } catch (err) {
            console.log(err);
            return [undefined, err];
        }
    }

    async create(user) {
        try {
            const result = await this.model.create(user);
            return [result, undefined]
        } catch (err) {
            // console.log(err);
            return [undefined, err]
        }
    }

    async updateBinding(user) {
        try {
            const result = await this.model.update({binding: user.binding}, {
                where: {
                    id: user.id
                }
            });

            return [result, undefined];
        } catch (err) {
            console.log(err);
            return [undefined, err];
        }
    }
}

function newSequelizeUserRepository(sequelize) {
    return new sequelizeUserRepository(sequelize)
}

module.exports = {
    UserRepository,
    newSequelizeUserRepository,
}