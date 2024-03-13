const { AssignmentRepository } = require("../repositories/assignment");
const { WrapError } = require('../errors/error');
const ErrorList = require('../errors/list');

class AssignmentService {
    constructor(assignmentRepository) {
        if (!assignmentRepository) {
            throw new Error('assignmentRepository is required');
        }

        if (!(assignmentRepository instanceof AssignmentRepository)) {
            throw new Error('assignmentRepository must be an instance of AssignmentRepository');
        }

        Object.defineProperties(this, {
            assignmentRepository: {
                value: assignmentRepository,
                writable: false
            }
        });
    }

    async evaluateAssignment(request) { }
}

class assignmentService extends AssignmentService {
    constructor(assignmentRepository) {
        super(assignmentRepository);

        /**
         * @type {AssignmentRepository}
         */
        this.assignmentRepository;
    }

    async evaluateAssignment(request) {
        let [result, err] = await this.assignmentRepository.get(request.id);
        if (err != undefined) {
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }

        if (result == undefined) {
            return [undefined, WrapError(ErrorList.ErrorNotFound, 'assignment not found')];
        }

        result.score = request.score;
        if (!result.data) {
            result.data = {};
        }
        result.data['comment'] = request.comment;

        [, err] = await this.assignmentRepository.updateScore(result);
        if (err != undefined) {
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }

        return [result, undefined];
    }
}

function newAssignmentService(assignmentRepository) {
    return new assignmentService(assignmentRepository);
}

module.exports = {
    AssignmentService,
    newAssignmentService
}