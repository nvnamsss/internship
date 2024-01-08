const { ReportRepository } = require('../repositories/report');
const { v4: uuidv4 } = require('uuid');

class ReportService {
    constructor(reportRepository) {
        if (!reportRepository) {
            throw new Error('reportRepository is required');
        }

        if (!(reportRepository instanceof ReportRepository)) {
            throw new Error('reportRepository must be an instance of reportRepository');
        }

        Object.defineProperties(this, {
            reportRepository: {
                value: reportRepository,
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
    constructor(reportRepository)  {
        super(reportRepository);
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

        let [result, err] = this.reportRepository.create(m);
        if (err != undefined) {
            return [undefined, err];
        }

        return [result, undefined];
    }

    async downloadReport(id) {

    }
}

function newReportService(reportRepository) {
    return new reportService(reportRepository);
}

module.exports = {
    ReportService,
    newReportService,
}