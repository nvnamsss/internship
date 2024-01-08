const { Op } = require("sequelize");

class ClassStudentRepository {
    async getStudentsByClassId(classId) {}
    async getStudentInClass(classId, studentID) {}
    async getStudentsInClass(classId, studentIDs) {}
    async addStudentsToClass(classId, studentIDs) {}
    async removeStudentFromClass(classId, studentID) {}
}

class classStudentRepository extends ClassStudentRepository {
    constructor(sequelize) {
        super()
        const model = sequelize.model('class_student');

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

    async getStudentsByClassId(classId) {
        try {
            const result = await this.model.findAll({
                where: {
                    class_id: classId
                }
            })
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async getStudentInClass(classId, studentId) {
        try {
            const result = await this.model.findOne({
                where: {
                    classId: classId,
                    studentId: studentId
                }
            })
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async getStudentsInClass(classID, studentIDs) {
        try {
            const result = await this.model.findOne({
                where: {
                    class_id: classID,
                    student_id: {
                        [Op.in]: studentIDs,
                    }
                }
            })
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async addStudentsToClass(classID, studentIDs) {
        if (studentIDs.length == 0) {
            return [[], undefined];
        }
        
        try {
            const result = await this.model.bulkCreate(studentIDs.map(studentID => {
                return {
                    class_id: classID,
                    student_id: studentID
                }
            }));
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }

    async removeStudentFromClass(classId, studentId) {
        try {
            const result = await this.model.destroy({
                where: {
                    classId: classId,
                    studentId: studentId
                }
            });
            return [result, undefined]
        } catch (err) {
            console.log(err);
            return [undefined, err]
        }
    }
}

function newSequelizeClassStudentRepository(sequelize) {
    return new classStudentRepository(sequelize);
}

module.exports = {
    ClassStudentRepository,
    newSequelizeClassStudentRepository,
}