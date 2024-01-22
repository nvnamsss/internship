const express = require('express');
const {StudentController} = require('../controllers/student');
const { newStudentService } = require('../services/student');
const { newSequelizeStudentRepository } = require('../repositories/student');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('config');
const { newMigration, newMigration_v2 } = require('../migrations/migrate');
const { newReportService } = require('../services/report');
const { newSequelizeReportRepository } = require('../repositories/report');
const { ReportController } = require('../controllers/report');
const { UserController } = require('../controllers/user');
const { newUserService } = require('../services/user');
const { UserRepository, newSequelizeUserRepository } = require('../repositories/user');
const { ClassController } = require('../controllers/class');
const { newSequelizeClassRepository } = require('../repositories/class');
const { newClassService } = require('../services/class');
const { newSequelizeAssignmentRepository } = require('../repositories/assignment');
const { DefineModel } = require('../models/model');
const { newSequelizeClassStudentRepository } = require('../repositories/class_student');
const { newSequelizeMeetingRepository } = require('../repositories/meeting');
const { newSequelizeTeacherRepository } = require('../repositories/teacher');
const authentication = require('../middlewares/authentication');
require('dotenv').config();

function createRoute() {
    const dbConfig = config.get('database')
    const dbDatabase = process.env.DATABASE_NAME || dbConfig.db || "database";
    const dbUsername = process.env.DATABASE_USERNAME || dbConfig.username || "username";
    const dbPassword = process.env.DATABASE_PASSWORD || dbConfig.password || "password";
    const dbHost = process.env.DATABASE_HOST || dbConfig.host || "localhost";
    const dbPort = process.env.DATABASE_PORT || dbConfig.port || 3306;

    const sequelize = new Sequelize(dbDatabase, dbUsername, dbPassword, {
        host: dbHost,
        port: dbPort,
        dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    });
    
    newMigration_v2(sequelize);
    DefineModel(sequelize);

    const studentRepository = newSequelizeStudentRepository(sequelize);
    const reportRepository = newSequelizeReportRepository(sequelize); 
    const userRepository = newSequelizeUserRepository(sequelize);
    const classRepository = newSequelizeClassRepository(sequelize);
    const assignmentRepository = newSequelizeAssignmentRepository(sequelize);
    const classStudentRepository = newSequelizeClassStudentRepository(sequelize);
    const meetingRepository = newSequelizeMeetingRepository(sequelize);
    const teacherRepository = newSequelizeTeacherRepository(sequelize);

    const studentService = newStudentService(studentRepository);
    const reportService = newReportService(reportRepository, assignmentRepository);
    const userService = newUserService(userRepository, teacherRepository, studentRepository);
    const classService = newClassService(classRepository, assignmentRepository, classStudentRepository, meetingRepository);
    
    const studentController = new StudentController(studentService);
    const reportController = new ReportController(reportService);
    const userController = new UserController(userService);
    const classController = new ClassController(classService);

    const router = express.Router();

    const v1 = express.Router();

    const student_v1 = express.Router();
    student_v1.get('/:id', studentController.get.bind(studentController));
    student_v1.post('/', studentController.create.bind(studentController));
    student_v1.put('/', studentController.create.bind(studentController));

    const report_v1 = express.Router();
    report_v1.get('/:id', reportController.get.bind(reportController));
    report_v1.post('/', authentication, reportController.create.bind(reportController));
    report_v1.get('/:ref_id/download', reportController.download.bind(reportController));
    // report_v1.get('/:id/download', reportController.download.bind(reportController));

    const auth_v1 = express.Router();
    auth_v1.post('/login', userController.login.bind(userController));
    auth_v1.post('/refresh', userController.refreshToken.bind(userController));
    auth_v1.post('/register', userController.register.bind(userController));
    auth_v1.post('/bind', authentication, userController.bind.bind(userController));

    const class_v1 = express.Router();
    class_v1.get('/:id', classController.get.bind(classController));
    class_v1.post('/:id/enroll', classController.enroll.bind(classController));
    class_v1.post('/:id/assignment', classController.addAssignment.bind(classController));
    class_v1.post('/:id/meeting', classController.addMeeting.bind(classController));
    class_v1.post('/', classController.create.bind(classController));
    class_v1.get('/', classController.search.bind(classController));

    v1.use('/student', student_v1);
    v1.use('/report', report_v1);
    v1.use('/class', class_v1);
    v1.use('/auth', auth_v1);

    router.use('/v1', v1);
    
    return router;
}

module.exports = createRoute;