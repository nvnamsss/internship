const { ClassService } = require('../services/class');
const { BaseController } = require('./base');

class ClassController extends BaseController {
    /**
     * 
     * @param {ClassService} classService 
     */
    constructor(classService) {
        super();
        if (!classService) {
            throw new Error('classService is required');
        }

        if (!(classService instanceof ClassService)) {
            throw new Error('classService must be an instance of ClassService');
        }

        /**
         * @type {ClassService}
         */
        this.classService = classService;
    }

    /**
    * @swagger
    * /v1/class/{id}:
    *   get:
    *     description: get class
    *     tags: [Class]
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: class id
    *         schema:
    *           type: integer
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *             schema:
    *                type: object
    *                $ref: '#/components/schemas/GetClassResponse'
    */
    async get(req, res) {
        let [result, err] = await this.classService.getClassById(req.params.id);
        if (err != undefined) {
            super.response(res, undefined, err);
            return;
        }

        if (result == undefined) {
            super.response(res, undefined, ErrorList.ErrorNotFound);
            return;
        }

        super.response(res, result, undefined);
    }

    /**
    * @swagger
    * /v1/class:
    *   post:
    *     description: Create class
    *     tags: [Class]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             $ref: '#/components/schemas/CreateClassRequest'
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *             schema:
    *                type: object
    *                $ref: '#/components/schemas/CreateClassResponse'
    */
    async create(req, res) {
        let [result, err] = await this.classService.addClass(req.body);
        if (err != undefined) {
            super.response(res, undefined, err);
            return;
        }

        super.response(res, result, undefined);
    }

    /**
    * @swagger
    * /v1/class:
    *   get:
    *     description: search class
    *     tags: [Class]
    *     parameters:
    *       - in: query
    *         name: page
    *         required: true
    *         description: page number, start from 1
    *         schema:
    *           type: integer
    *       - in: query
    *         name: page_size
    *         required: true
    *         description: page size
    *         schema:
    *           type: integer
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *             schema:
    *                type: object
    *                $ref: '#/components/schemas/SearchClassResponse'
    */
    async search(req, res) {
        let m = {
            page: Number(req.query.page),
            page_size: Number(req.query.page_size),
        };
        console.log(m);

        let [result, err] = await this.classService.search(m);
        if (err != undefined) {
            super.response(res, undefined, err);
            return;
        }

        super.response(res, result, undefined);
    }

    /**
    * @swagger
    * /v1/class/{id}/enroll:
    *   post:
    *     description: add students into class
    *     tags: [Class]
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: class id
    *         schema:
    *           type: integer
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             $ref: '#/components/schemas/EnrollClassRequest'
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *             schema:
    *                type: object
    *                $ref: '#/components/schemas/EnrollClassResponse'
    */
    async enroll(req, res) {
        let class_id = req.params.id;
        let student_ids = req.body.student_ids;

        let [result, err] = await this.classService.enroll(class_id, student_ids);
        if (err != undefined) {
            super.response(res, undefined, err);
            return;
        }

        if (result == undefined) {
            super.response(res, undefined, ErrorList.ErrorNotFound);
            return;
        }

        super.response(res, result, undefined);
    }
    
    /**
    * @swagger
    * /v1/class/{id}/assignment:
    *   post:
    *     description: Create class
    *     tags: [Class]
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: class id
    *         schema:
    *           type: integer
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             $ref: '#/components/schemas/AddAssignmentRequest'
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *             schema:
    *                type: object
    *                $ref: '#/components/schemas/AddAssignmentResponse'
    */
    async addAssignment(req, res) {
        let id = req.params.id;
        let assignment = {
            class_id: id,
            name: req.body.name,
        };

        let [result, err] = await this.classService.addAssignment(assignment);
        super.response(res, result, err);
    }

    /**
    * @swagger
    * /v1/class/{id}/meeting:
    *   post:
    *     description: randomly create meeting for class
    *     tags: [Class]
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: class id
    *         schema:
    *           type: integer
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             $ref: '#/components/schemas/AddMeetingRequest'
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *             schema:
    *                type: object
    *                $ref: '#/components/schemas/AddMeetingResponse'
    */
    async addMeeting(req, res) {
        let id = req.params.id;
        let meeting = req.body;
        meeting.from = new Date(meeting.from);
        meeting.to = new Date(meeting.to);

        let [result, err] = await this.classService.addMeeting(id, meeting);
        super.response(res, result, err);
    }
}

module.exports = {
    ClassController
}