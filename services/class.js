const { AssignmentRepository } = require('../repositories/assignment');
const { ClassRepository } = require('../repositories/class');
const { ClassStudentRepository } = require('../repositories/class_student');
const {WrapError} = require('../errors/error');
const ErrorList = require('../errors/list');
const { MeetingRepository } = require('../repositories/meeting');
const {EncodeCursor, DecodeCursor} = require('../utils/cursor');

class ClassService {
    /**
     * 
     * @param {ClassRepository} classRepository 
     * @param {AssignmentRepository} assignmentRepository 
     * @param {ClassStudentRepository} classStudentRepository 
     * @param {MeetingRepository} meetingRepository
     */
    constructor(classRepository, assignmentRepository, classStudentRepository, meetingRepository) {
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

        if (!meetingRepository) {
            throw new Error('ClassService must be constructed with a meetingRepository')
        }

        if (!(meetingRepository instanceof MeetingRepository)) {
            throw new Error('meetingRepository must be an instance of MeetingRepository')
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
            },
            meetingRepository: {
                value: meetingRepository,
                writable: false
            },
        });
    }

    async addClass(req) { }
    async addAssignment(req) { }
    async verifyAssignment(req) {}

    async search(req) { }

    async getClassById(id) { }

    async enroll(id, student) { }
}

class classService extends ClassService {
    constructor(
        classRepository, 
        assignmentRepository, 
        classStudentRepository,
        meetingRepository,
        ) {
        super(classRepository, assignmentRepository, classStudentRepository, meetingRepository);

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
        /**
         * @type {MeetingRepository}
         */
        this.meetingRepository;
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
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
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
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }

        return [result, undefined];
    }

    async verifyAssignment(req) {
        let [result, assignment, err] = [undefined, undefined, undefined];
        
        [assignment, err] = await this.assignmentRepository.get(req.id);
        if (assignment == undefined) {
            return [undefined, ErrorList.ErrorNotFound];
        }
        if (err != undefined) {
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }
        
        [result, err] = await this.assignmentRepository.update({
            id: assignment.id,
            name: assignment.name,
            verified: req.verified,
        });

        if (err != undefined) {
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }

        [result, err] = await this.assignmentRepository.get(req.id);
        if (result == undefined) {
            return [undefined, ErrorList.ErrorNotFound];
        }

        if (err != undefined) {
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }

        return [result, undefined];
    }

    async search(req) {
        let cursor = DecodeCursor(req.cursor);

        let [result, err] = await this.classRepository.search({
            cursor: cursor.cursor,
            page_size: req.page_size + 1,
        });

        if (err != undefined) {
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }

        if (result == undefined) {
            return [undefined, undefined];
        }

        let data = [];
        let last = Math.min(result.length, req.page_size);
        for (let i = 0; i < last; i++) {
            data.push(result[i]);
        }

        let next_cursor = "";
        if (result.length > req.page_size) {
            next_cursor = EncodeCursor(result[last].id);
        }

        let response = {
            data: result,
            next_cursor: next_cursor
        };

        return [response, err];
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

    /**
     * 
     * @param {*} class_id 
     * @param {*} meeting 
     * @returns 
     */
    async addMeeting(class_id, m) {
        let [c, classErr] = await this.classRepository.get(class_id);
        if (classErr != undefined) {
            console.log(classErr);
            return [undefined, ErrorList.ErrorInternalServer];
        }
        
        if (c == null) {
            return [undefined, ErrorList.ErrorNotFound];
        }

        for (let i = 0; i < c.assignments.length; i++) {
            if (c.assignments[i].verified) {
                return [undefined, ErrorList.ErrorAssignmentNotVerified];
            }
        }
        
        let slots = generateSlots(m.from, m.to, m.interval * 60);
        if (slots.length == 0) {
            return [undefined, ErrorList.ErrorInvalidRequest];
        }

        let [existed_student_ids, excluded_err] = await this.meetingRepository.getByClassID(class_id);
        if (excluded_err != undefined) {
            console.log(excluded_err);
            return [undefined, ErrorList.ErrorInternalServer];
        }

        let excluded_student_ids = existed_student_ids.map(meeting => meeting.student_id);
        // find students have not arranged
        let [student_ids, randomErr] = await this.classStudentRepository.getRandomByClassID(class_id, slots.length, excluded_student_ids);
        if (randomErr != undefined) {
            console.log(randomErr);
            return [undefined, ErrorList.ErrorInternalServer];
        }

        let length = Math.min(student_ids.length, slots.length);
        if (length == 0) {
            return [{
                count: 0,
            }, undefined];
        }

        let meetings = [];
        for (let i = 0; i < length; i++) {
            let meeting = {
                class_id: class_id,
                student_id: student_ids[i].id,
                teacher_id: m.teacher_id,
                from: slots[i].from,
                to: slots[i].to,
                room: m.room,
            };
            meetings.push(meeting);
        }
        
        let [result, err] = await this.meetingRepository.batchCreate(meetings);
        if (err != undefined) {
            console.log(err);
            return [undefined, ErrorList.ErrorInternalServer];
        }

        if (result == null) {
            return [undefined, ErrorList.ErrorNotFound];
        }
        
        return [{
            count: result.length,
        }, err];
    }
}

function generateSlots(from, to, interval) {
    let steps = [];

    let unixFrom = from.getTime() / 1000;
    let unixTo = to.getTime() / 1000;
    let current = unixFrom;

    console.log(unixFrom);
    while (current + interval <= unixTo) {
        steps.push({
            from: new Date(current * 1000),
            to: new Date((current + interval) * 1000),
        });

        current += interval;
    }

    return steps;
}

/**
 * 
 * @param {ClassRepository} classRepository 
 * @param {AssignmentRepository} assignmentRepository 
 * @param {ClassStudentRepository} classStudentRepository
 * @param {MeetingRepository} meetingRepository 
 * @returns 
 */
function newClassService(
    classRepository,
    assignmentRepository,
    classStudentRepository,
    meetingRepository,
) {
    return new classService(classRepository, assignmentRepository, classStudentRepository, meetingRepository);
}

module.exports = {
    ClassService,
    newClassService,
}