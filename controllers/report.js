const { BaseController } = require("./base");
const { ReportService } = require("../services/report");
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

    // Create an instance of multer

    async create(req, res, next) {
        let m = req.body;
        let file = req.file;

        console.log(m);
        console.log(file);

        let [result, err] = await this.reportService.createReport(m);
        if (err != undefined) {
            super.response(res, undefined, err);
            return;
        }

        super.response(res, result, undefined);

        // const upload = multer({ dest: 'uploads/' });
        // // Use the upload middleware to handle the file upload
        // upload.single('file')(req, res, async function (err) {
        //     if (err) {
        //         // Handle the error
        //         return next(err);
        //     }

        //     // Access the uploaded file using req.file
        //     const file = req.file;

        //     // Process the file as needed
        //     // ...

        //     // Send a response
        //     res.send('File uploaded successfully');
        // });


    }
}

module.exports = {
    ReportController,
}