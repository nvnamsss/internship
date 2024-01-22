const { ReportRepository } = require('../repositories/report');
const { v4: uuidv4 } = require('uuid');
const { WrapError } = require('../errors/error');
const ErrorList = require('../errors/list');
const fs = require('fs');
const { AssignmentRepository } = require('../repositories/assignment');

class ReportService {
    constructor(reportRepository, assignmentRepository) {
        if (!reportRepository) {
            throw new Error('reportRepository is required');
        }

        if (!(reportRepository instanceof ReportRepository)) {
            throw new Error('reportRepository must be an instance of reportRepository');
        }

        if (!assignmentRepository) {
            throw new Error('assignmentRepository is required');
        }

        if (!(assignmentRepository instanceof AssignmentRepository)) {
            throw new Error('assignmentRepository must be an instance of assignmentRepository');
        }

        Object.defineProperties(this, {
            reportRepository: {
                value: reportRepository,
                writable: false
            },
            assignmentRepository: {
                value: assignmentRepository,
                writable: false
            }
        });
    }

    async getReport(id) {}
    async createReport(m) {}
    async downloadReport(id) {}
}

/**
 * Implementation of ReportService
 */
class reportService extends ReportService{
    /**
     * 
     * @param {ReportRepository} reportRepository 
     */
    constructor(reportRepository, assignmentRepository)  {
        super(reportRepository, assignmentRepository);

        /**
         * @type {ReportRepository}
         */
        this.reportRepository;
        
        /**
         * @type {AssignmentRepository}
         */
        this.assignmentRepository;
    }

    async getReport(id) {
        let [result, err] = this.reportRepository.get(id);
        if (err != undefined) {
            return [undefined, err];
        }

        if (result == undefined) {
            return [undefined, ErrorList.ErrorNotFound];
        }
        
        let ext = result.data.ext;
        if (ext == undefined) {
            ext = 'pdf';
        }

        return [result, undefined];
    }

    /**
     * 
     * @param {*} m 
     */
    async createReport(m) {
        m.ref_id = uuidv4();
        m.data = {
            name: m.file_name,
        }

        let file = await fs.readFileSync(m.file_path);
        m.file = file;

        let [assignment, assignmentErr] = await this.assignmentRepository.get(m.assignment_id);
        if (assignmentErr != undefined) {
            console.log('get assignment got error', assignmentErr);
            return [undefined, WrapError(ErrorList.ErrorInternalServer, assignmentErr.message)];
        }

        if (assignment == undefined) {
            console.log('assignment not found');
            return [undefined, ErrorList.ErrorNotFound];
        }

        m.class_id = assignment.class_id;
        console.log(m);

        let [result, err] = await this.reportRepository.create(m);
        if (err != undefined) {
            console.log('create report got error', err)
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }

        return [result, undefined];
    }

    async getFile(ref_id) {
        let [result, err] = await this.reportRepository.getFileByRefID(ref_id);
        if (err != undefined) {
            return [undefined, err];
        }

        if (result == undefined) {
            return [undefined, ErrorList.ErrorNotFound];
        }

        return [result, undefined];
    }
}

function newReportService(reportRepository, assignmentRepository) {
    return new reportService(reportRepository, assignmentRepository);
}

module.exports = {
    ReportService,
    newReportService,
}