const { AssignmentRepository } = require('../repositories/assignment');
const { ClassRepository } = require('../repositories/class');
const { ClassStudentRepository } = require('../repositories/class_student');
const ErrorList = require('../errors/list');
const { MeetingRepository } = require('../repositories/meeting');

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

    async addClass(classObj) { }
    async addAssignment(assignment) { }

    async search() { }

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
        
        for (let i = 0; i < c.assignment.length; i++) {
            if (!c.assignment[i].veriied) {
                return [undefined, ErrorList.ErrorAssignmentNotVerified];
            }
        }
        
        meeting.code = `${class_id}.${student.code}`;

        let slots = generateSlots(m.from, m.to, m.interval * 60);
        if (slots.length == 0) {
            return [undefined, ErrorList.ErrorInvalidRequest];
        }

        let meetings = [];
        for (let i = 0; i < slots; i++) {
            let meeting = {
                class_id: class_id,
                teacher_id: m.teacher_id,
                from: slots[i].from,
                to: slots[i].to,
                room: room,
            };
            meetings.push(meeting);
        }
        
        let [result, err] = await this.meetingRepository.addMeeting(class_id, meeting);
        if (err != undefined) {
            console.log(err);
            return [undefined, ErrorList.ErrorInternalServer];
        }

        if (result == undefined) {
            return [undefined, ErrorList.ErrorClassNotFound];
        }

        return [result, err];
    }
}

function generateSlots(from, to, interval) {
    let steps = [];

    let unixFrom = from.getTime();
    let unixTo = to.getTime();
    let current = unixFrom;

    while (current + interval <= unixTo) {
        steps.push({
            from: new Date(current),
            to: new Date(current + interval),
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