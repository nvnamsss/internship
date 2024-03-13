const { TeacherRepository, meo } = require('../repositories/teacher');

const ErrorList = require('../errors/list');
const {WrapError} = require('../errors/error');

class TeacherService {
    constructor(teacherRepository) {
        if (!teacherRepository) {
            throw new Error('teacherRepository is required');
        }

        if (!(teacherRepository instanceof TeacherRepository)) {
            throw new Error('teacherRepository must be an instance of TeacherRepository');
        }

        Object.defineProperties(this, {

            teacherRepository: {
                value: teacherRepository,
                writable: false
            }

        });
    }

    async get(id) { }
    async create(teacher) { }
    async update(teacher) { }
}

/**
 * @class
 * @constructor
 * @public
 */
class teacherService extends TeacherService {
    constructor(teacherRepository) {
        super(teacherRepository);

        /**
         * @type {TeacherRepository}
         */
        this.teacherRepository;
    }

    async get(id) {
        let [result, err] = await this.teacherRepository.get(id);
        if (err != undefined) {
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }

        if (result == undefined) {
            return [undefined, ErrorList.ErrorNotFound];
        }

        let data = {
            name: result.name,
            ...result.data
        }

        return [data, undefined];
    }

    async create(teacher) {
        let [result, err] = await this.teacherRepository.create(teacher);
        return [result, err];
    }

    async update(req) {
        let [result, err] = [undefined, undefined];

        [result, err] = await this.teacherRepository.get(req.id);
        if (err != undefined) {
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }

        if (result == undefined) {
            return [undefined, ErrorList.ErrorNotFound];
        }

        if (!result.data) {
            result.data = {};
        }
        
        result.name = req.name;
        result.data.sex = req.sex;
        result.data.address = req.address;
        result.data.phone = req.phone;
        result.data.email = req.email;
        result.data.nationality = req.nationality;
        result.data.birthday = req.birthday;

        [result, err] = await this.teacherRepository.update(result);
        if (err != undefined) {
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }
        
        [result, err] = await this.teacherRepository.get(req.id);
        if (err != undefined) {
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }

        return [result, undefined];
    }
}


function newTeacherService(teacherRepository) {
    return new teacherService(teacherRepository);
}

module.exports = {
    TeacherService,
    newTeacherService,
}