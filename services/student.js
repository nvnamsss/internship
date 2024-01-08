const { StudentRepository, meo } = require('../repositories/student');

class StudentService {
    constructor(studentRepository) {
        if (!studentRepository) {
            throw new Error('studentRepository is required');
        }

        if (!(studentRepository instanceof StudentRepository)) {
            throw new Error('studentRepository must be an instance of StudentRepository');
        }

        Object.defineProperties(this, {

            studentRepository: {
                value: studentRepository,
                writable: false
            }

        });
    }

    async getStudent(id) { }
    async createStudent(student) { }
    async updateStudent(student) { }
}

/**
 * @class
 * @constructor
 * @public
 */
class studentService extends StudentService {
    constructor(studentRepository) {
        super(studentRepository);

        /**
         * @type {StudentRepository}
         */
        this.studentRepository;
    }

    async getStudent(id) {
        let [result, err] = await this.studentRepository.get(id);
        return [result, err];
    }

    async createStudent(student) {
        let [result, err] = await this.studentRepository.create(student);
        return [result, err];
    }

    async updateStudent(student) {
        return StudentServiceInterface.updateStudent(student);
    }
}


function newStudentService(studentRepository) {
    return new studentService(studentRepository);
}

module.exports = {
    StudentService,
    newStudentService,
}