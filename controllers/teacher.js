const { response } = require("express");
const { BaseController } = require("./base");

class TeacherController extends BaseController {
    constructor(teacherService) {
        super();

        if (!teacherService) {
            throw new Error('teacherService is required');
        }

        if (!(teacherService instanceof TeacherService)) {
            throw new Error('teacherService must be an instance of TeacherService');
        }

        Object.defineProperties(this, {
            teacherService: {
                value: teacherService,
                writable: false
            }
        });
    }

    async update(req, res, next) {
        let request = {
            id: req.payload.student_id,
            ...req.body
        };

        let [student, err] = await this.studentService.updateStudent(request);

        super.response(res, student, err);
    }
}