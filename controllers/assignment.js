const { response } = require("express");
const { BaseController } = require("./base");
const { AssignmentService } = require("../services/assignment");

class AssignmentController extends BaseController {
    constructor(assignmentService) {
        super();

        if (!assignmentService) {
            throw new Error('assignmentService is required');
        }

        if (!(assignmentService instanceof AssignmentService)) {
            throw new Error('assignmentService must be an instance of AssignmentService');
        }

        Object.defineProperties(this, {
            assignmentService: {
                value: assignmentService,
                writable: false
            }
        });
        

        /**
         * @type {AssignmentService}
         */
        this.assignmentService;
    }

    /**
    * @swagger
    * /v1/assignment/{id}/evaluate:
    *   put:
    *     description: evaluate assignment
    *     tags: [Assignment]
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
    *             $ref: '#/components/schemas/EvaluateAssignmentRequest'
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *             schema:
    *                type: object
    *                $ref: '#/components/schemas/EvaluateAssignmentResponse'
    *     security:
    *     - BasicAuthToken: []
    */
    async evaluate(req, res) {
        let request = {
            id: req.params.id,
            score: req.body.score,
            comment: req.body.comment,
        }

        let [result, err] = await this.assignmentService.evaluateAssignment(request);
        super.response(res, result, err);
    }
}

module.exports = {
    AssignmentController
}