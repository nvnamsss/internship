const { MajorService } = require("../services/major");
const { BaseController } = require("./base");


class MajorController extends BaseController {
    constructor(majorService) {
        super();
        if (!majorService) {
            throw new Error('majorService is required');
        }

        if (!(majorService instanceof MajorService)) {
            throw new Error('majorService must be an instance of MajorService');
        }

        /**
         * @type {MajorService}
         */
        this.majorService = majorService;
    }

    /**
    * @swagger
    * /v1/major:
    *   get:
    *     description: get all majors
    *     tags: [Major]
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *             schema:
    *                type: object
    *                $ref: '#/components/schemas/GetAllMajorResponse'
    */
    async getAll(req, res) {
        let [result, err] = await this.majorService.getAll();
        if (err != undefined) {
            super.response(res, undefined, err);
            return;
        }

        super.response(res, result, undefined);
    }
}

module.exports = {
    MajorController,
}