const { BaseController } = require("./base");
const { ReportService } = require("../services/report");
const {formidable} = require('formidable');
const stream = require('stream');
// const multer = require('multer');

class ReportController extends BaseController {
    /**
     * 
     * @param {ReportService} reportService 
     */
    constructor(reportService) {
        super();

        if (!reportService) {
            throw new Error('reportService is required');
        }

        if (!(reportService instanceof ReportService)) {
            throw new Error('reportService must be an instance of ReportService');
        }

        Object.defineProperties(this, {
            reportService: {
                value: reportService,
                writable: false
            }
        });
    }

    /**
    * @swagger
    * /v1/report/{id}:
    *   get:
    *     description: get report
    *     tags: [Report]
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: Numeric ID of the user to retrieve.
    *         type: integer
    *         schema:
    *           type: integer
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *               schema:
    *                   type: object
    *                   $ref: '#/components/schemas/GetReportResponse'
    *     security:
    *     - BasicAuthToken: []
    */
    async get(req, res, next) {
        let [result, err] = await this.reportService.getReport(req.params.id);
        if (err != undefined) {
            super.response(res, undefined, err);
            return;
        }

        if (result == undefined) {
            super.response(res, undefined, ErrorList.ErrorNotFound);
            return;
        }

        res.setHeader('Content-Type', 'application/' + ext);
        res.setHeader('Content-Disposition', 'attachment; filename=' + result.data.name + '.' + ext);

        res.send(result.data.data);
    } 

    /**
    * @swagger
    * /v1/report:
    *   post:
    *     description: Create report
    *     tags: [Report]
    *     requestBody:
    *       required: true
    *       content:
    *         multipart/form-data:
    *           schema:
    *             type: object
    *             $ref: '#/components/schemas/CreateReportRequest'
    *     responses:
    *       200:
    *         description: success
    *         content:
    *           application/json:
    *             schema:
    *                type: object
    *                $ref: '#/components/schemas/CreateReportResponse'
    *     security:
    *     - BasicAuthToken: []
    */
    async create(req, res, next) {
        const form = formidable({});
        form.parse(req, async (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }

            let file = files.file;
            let request = {
                assignment_id: fields.assignment_id[0],
                student_id: req.payload.student_id,
                file_path: file[0].filepath,
                file_name: file[0].originalFilename,
            };

            let [result, reportErr] = await this.reportService.createReport(request);
            if (reportErr != undefined) {
                super.response(res, undefined, reportErr);
                return;
            }

            let payload = req.payload;

            super.response(res, {fields, file, payload}, undefined);
        });
    }

    /**
    * @swagger
    * /v1/report/{ref_id}/download:
    *   get:
    *     description: download report as file
    *     tags: [Report]
    *     parameters:
    *       - in: path
    *         name: ref_id
    *         required: true
    *         description: reference ID of the report to retrieve.
    *         type: integer
    *         schema:
    *           type: integer
    *     responses:
    *       200:
    *         description: success
    *     security:
    *     - BasicAuthToken: []
    */
    async download(req, res, next) {
        let [report, err] = await this.reportService.getFile(req.params.ref_id);
        if (err != undefined) {
            super.response(res, undefined, err);
            return;
        }

        let fileContents = Buffer.from(report.file, "base64");
        let readStream = new stream.PassThrough();
        readStream.end(fileContents);

        let filename = req.params.ref_id;
        if (report.data != undefined) {
            filename = report.data.name;
        }
        
        res.set('Content-disposition', 'attachment; filename=' + filename);
        res.set('Content-Type', 'text/plain');
      
        readStream.pipe(res);
    }
}

module.exports = {
    ReportController,
}