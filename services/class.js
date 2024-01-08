const { AssignmentRepository } = require('../repositories/assignment');
const { ClassRepository } = require('../repositories/class');
const { ClassStudentRepository } = require('../repositories/class_student');
const ErrorList = require('../errors/list');

class ClassService {
    /**
     * 
     * @param {ClassRepository} classRepository 
     * @param {AssignmentRepository} assignmentRepository 
     * @param {ClassStudentRepository} classStudentRepository 
     */
    constructor(classRepository, assignmentRepository, classStudentRepository) {
        if (!classRepository) {
            throw new Error('ClassService must be constructed with a classRepository')
        }

        if (!(classRepository instanceof ClassRepository)) {
            throw new Error('classRepository must be an instance of ClassRepository')
        }

        if (!assignmentRepository) {
            throw new Error('ClassService must be constructed with a assignmentRepository')
        }

        if (!(assignmentRepository instanceof AssignmentRepository)) {
            throw new Error('assignmentRepository must be an instance of AssignmentRepository')
        }

        if (!classStudentRepository) {
            throw new Error('ClassService must be constructed with a classStudentRepository')
        }

        if (!(classStudentRepository instanceof ClassStudentRepository)) {
            throw new Error('classStudentRepository must be an instance of ClassStudentRepository')
        }

        Object.defineProperties(this, {
            classRepository: {
                value: classRepository,
                writable: false
            },
            assignmentRepository: {
                value: assignmentRepository,
                writable: false
            },
            classStudentRepository: {
                value: classStudentRepository,
                writable: false
            }
        });
    }

    async addClass(classObj) { }
    async addAssignment(assignment) { }

    async search() { }

    async getClassById(id) { }

    async enroll(id, student) { }
}

class classService extends ClassService {
    constructor(classRepository, assignmentRepository, classStudentRepository) {
        super(classRepository, assignmentRepository, classStudentRepository);

        /**
         * @type {ClassRepository}
         */
        this.classRepository;
        /**
         * @type {AssignmentRepository}
         */
        this.assignmentRepository;

        /**
         * @type {ClassStudentRepository}
         */
        this.classStudentRepository;
    }

    async addClass(classObj) {
        let value = {
            code: classObj.code,
            name: classObj.name,
            data: {
                module_id: classObj.module_id,
                module_name: classObj.module_name,
            }
        }

        let [check] = await this.classRepository.getByCode(value.code);
        if (check != null) {
            return [undefined, ErrorList.ErrorClassCodeDuplicate];
        }

        let [result, err] = await this.classRepository.create(value);
        if (err != undefined) {
            return [undefined, err];
        }

        let assignments = [];
        for (let i = 0; i < classObj.assignments.length; i++) {
            let assignment = {
                name: classObj.assignments[i].name,
                class_id: result.id,
            }
            assignments.push(assignment);
        }

        let [agmResult, agmErr] = await this.assignmentRepository.batchCreate(assignments);
        if (agmErr != undefined) {
            return [undefined, agmErr];
        }


        let data = {
            id: result.id,
            code: result.code,
            name: result.name,
            data: result.data,
            assignments: agmResult,
        }

        return [data, undefined];
    }

    async addAssignment(assignment) {
        let [result, err] = await this.assignmentRepository.create(assignment);
        if (err != undefined) {
            return [undefined, err];
        }

        return [result, undefined];
    }

    async search(m) {
        let [result, err] = await this.classRepository.search(m);

        if (err != undefined) {
            return [undefined, err];
        }

        if (result == undefined) {
            return [undefined, undefined];
        }

        let data = [];
        for (let i = 0; i < result.length; i++) {
            data.push(result[i]);
        }

        return [data, err];
    }

    async getClassById(id) {
        let [result, err] = await this.classRepository.get(id);
        return [result, err];
    }

    async deleteClassById(id) {
        return this.classRepository.delete(id);
    }

    async updateClassById(id, classObj) {
        return this.classRepository.update(id, classObj);
    }

    async enroll(class_id, student_ids) {
        if (student_ids.length == 0) {
            return [undefined, ErrorList.ErrorStudentIdsEmpty];
        }

        
        let [existed, existedErr] = await this.classStudentRepository.getStudentsInClass(class_id, student_ids);
        if (existedErr != undefined) {
            console.log(existedErr);
            return [undefined, ErrorList.ErrorInternalServer];
        }

        console.log(existed);
        let existed_ids = existed.map(student => student.id);
        let enroll_ids = student_ids.filter(id => !existed_ids.includes(id));

        let data = {
            count: 0
        }


        let [result, err] = await this.classStudentRepository.addStudentsToClass(class_id, enroll_ids);
        if (err != undefined) {
            console.log(err);
            return [undefined, ErrorList.ErrorInternalServer];
        }

        data.count = result.length;

        return [data, err];
    }
}

/**
 * 
 * @param {ClassRepository} classRepository 
 * @param {AssignmentRepository} assignmentRepository 
 * @returns 
 */
function newClassService(
    classRepository,
    assignmentRepository,
    classStudentRepository,
) {
    return new classService(classRepository, assignmentRepository, classStudentRepository);
}

module.exports = {
    ClassService,
    newClassService,
}