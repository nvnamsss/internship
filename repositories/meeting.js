class MeetingRepository {
    async get(id) {}
    async getByClassID(class_id) {}
    async create(meeting) {}
    async batchCreate(meetings) {}
}

class selizalizeMeetingRepository extends MeetingRepository {
    constructor(sequelize) {
        super();
        const model = sequelize.model('meeting');

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

    async getByClassID(class_id) {
        try {
            const result = await this.model.findAll({
                where: {
                    class_id: class_id
                }
            });

            return [result, undefined];
        } catch (err) {
            console.log(err);
            return [undefined, err];
        
        }
    }
    
    async create(meeting) {
        try {
            const result = await this.model.create(meeting);
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async batchCreate(meetings) {
        try {
            const result = await this.model.bulkCreate(meetings);
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }
    
    async update(meeting) {
        try {
            const result = await this.model.update(meeting, {
                where: {
                    id: meeting.id
                }
            });
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }
}

function newSequelizeMeetingRepository(sequelize) {
    return new selizalizeMeetingRepository(sequelize);
}

module.exports = {
    MeetingRepository,
    newSequelizeMeetingRepository
}