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

        /**
         * @type {StudentService}
         */
        this.studentService;
    }

    /**
    * @swagger
    * /v1/student:
    *   get:
    *     description: get student
    *     tags: [Student]
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *               schema:
    *                   type: object
    *                   $ref: '#/components/schemas/GetStudentResponse'
    *     security:
    *     - BasicAuthToken: []
    */
    async get(req, res, next) {
        let [student, err] = await this.studentService.getStudent(req.payload.student_id);
        
        super.response(res, student, err);
        // response(res, student, err);
    }

    /**
    * @swagger
    * /v1/student:
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
    *                $ref: '#/components/schemas/CreateStudentResponse'
    *     security:
    *     - BasicAuthToken: []
    */
    async create(req, res, next) {
        let [student, err] = await this.studentService.create(req.body);
        

        response(res, student, err);
    }

    /**
    * @swagger
    * /v1/student:
    *   post:
    *     description: Update student
    *     tags: [Student]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             $ref: '#/components/schemas/UpdateStudentRequest'
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *             schema:
    *                type: object
    *                $ref: '#/components/schemas/UpdateStudentResponse'
    *     security:
    *     - BasicAuthToken: []
    */
    async update(req, res, next) {
        let request = {
            id: req.payload.student_id,
            ...req.body
        };

        let [student, err] = await this.studentService.update(request);

        super.response(res, student, err);
    }
}



module.exports = {
    StudentController
}