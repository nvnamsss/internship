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

    async create(req, res) {
        let [result, err] = await this.classService.addClass(req.body);
        if (err != undefined) {
            super.response(res, undefined, err);
            return;
        }

        super.response(res, result, undefined);
    }

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
    
    async addAssignment(req, res) {
        let id = req.params.id;
        let assignment = {
            class_id: id,
            name: req.body.name,
        };

        let [result, err] = await this.classService.addAssignment(assignment);
        super.response(res, result, err);
    }

    async addMeeting(req, res) {
        let id = req.params.id;
        let meeting = {
            class_id: id,
            name: req.body.name,
        };

        let [result, err] = await this.classService.addAssignment(assignment);
        super.response(res, result, err);
    }
}

module.exports = {
    ClassController
}