const { response } = require("express");
const { newStudentService, StudentService } = require("../services/student");
const { BaseController } = require("./base");
/**
 * @class
 * @constructor
 * @public
 */
class StudentController extends BaseController {
    /**
     * @param {StudentService} studentService
     */
    constructor(studentService) {
        super();

        if (!studentService) {
            throw new Error('studentService is required');
        }

        if (!(studentService instanceof StudentService)) {
            throw new Error('studentService must be an instance of StudentRepository');
        }

        Object.defineProperties(this, {
            studentService: {
                value: studentService,
                writable: false
            }
        
        });
    }

    /**
    * @swagger
    * /student/{id}:
    *   post:
    *     description: get student
    *     tags: [Student]
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: Numeric ID of the user to retrieve.
    *         schema:
    *           type: integer
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *             schema:
    *                type: object
    *                $ref: '#/components/schemas/GetStudentResponse'
    */
    async get(req, res, next) {
        console.log(this.studentService);
        let [student, err] = await this.studentService.getStudent(req.params.id);
        
        super.response(res, student, err);
        // response(res, student, err);
    }

    /**
    * @swagger
    * /student:
    *   post:
    *     description: Create student
    *     tags: [Student]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             $ref: '#/components/schemas/CreateStudentRequest'
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *             schema:
    *                type: object
    *                $ref: '#/components/schemas/LoginResponse'
    */
    async create(req, res, next) {
        console.log(req.body);
        let [student, err] = await this.studentService.createStudent(req.body);
        

        response(res, student, err);
    }

    async update(req, res, next) {
        console.log(req.body);
        let [student, err] = await this.studentService.updateStudent(req.body);

        response(res, student, err);
    }
}



module.exports = {
    StudentController
}