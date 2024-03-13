const bcrypt = require('bcrypt');
const { BaseController } = require('./base');
const { UserService } = require('../services/user');
const ErrorList = require('../errors/list');
const jwt = require('jsonwebtoken');
const { ROLEID2ROLE, ROLES } = require('../models/user');
const { StudentService } = require('../services/student');
const { TeacherService } = require('../services/teacher');

class UserController extends BaseController {
    constructor(userService, studentService, teacherService) {
        super();

        if (!userService) {
            throw new Error('userService is required');
        }

        if (!(userService instanceof UserService)) {
            throw new Error('userService must be an instance of UserService');
        }

        if (!studentService) {
            throw new Error('studentService is required');
        }

        if (!studentService instanceof StudentService) {
            throw new Error('studentService must be an instance of StudentService');
        }

        if (!teacherService) {
            throw new Error('teacherService is required');
        }

        if (!teacherService instanceof TeacherService) {
            throw new Error('teacherService must be an instance of TeacherService');
        }

        Object.defineProperties(this, {
            userService: {
                value: userService,
                writable: false
            },
            studentService: {
                value: studentService,
                writable: false
            },
            teacherService: {
                value: teacherService,
                writable: false
            }
        });

        /**
         * @type {UserService}
         */
        this.userService;

        /**
         * @type {StudentService}
         */
        this.studentService;

        /**
         * @type {TeacherService}
         */
        this.teacherService;
    }

    /**
     * @swagger
     * /v1/user:
     *   get:
     *     description: get user information
     *     tags: [User]
     *     responses:
     *       200:
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *                type: object
     *                $ref: '#/components/schemas/GetUserResponse'
     *     security:
     *     - BasicAuthToken: []
     */
    async get(req, res) {
        try {
            let payload = req.payload;

            let role = ROLEID2ROLE[payload.role_id];
            let [result, err] = [undefined, undefined];

            switch (role) {
                case ROLES.STUDENT:
                    [result, err] = await this.studentService.get(payload.student_id);
                    if (err != undefined) {
                        super.response(res, undefined, err);
                        return;
                    }

                    super.response(res, result, undefined);
                    return;
                case ROLES.TEACHER:
                    [result, err] = await this.teacherService.get(payload.teacher_id);
                    if (err != undefined) {
                        super.response(res, undefined, err);
                        return;
                    }
                    super.response(res, result, undefined);
                    return;
            }

            super.response(res, {}, undefined);
        } catch (error) {
            super.response(res, undefined, ErrorList.ErrUnauthorized);
        }

    }

    /**
     * @swagger
     * /v1/user:
     *   put:
     *     description: update user information
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             $ref: '#/components/schemas/UpdateUserRequest'
     *     responses:
     *       200:
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *                type: object
     *                $ref: '#/components/schemas/UpdateUserResponse'
     *     security:
     *     - BasicAuthToken: []
     */
    async update(req, res) {
        try {
            let payload = req.payload;

            let role = ROLEID2ROLE[payload.role_id];
            let [result, err] = [undefined, undefined];
            let request = {
                ...req.body
            }


            switch (role) {
                case ROLES.STUDENT:
                    request.id = payload.student_id;

                    [result, err] = await this.studentService.update(request);
                    if (err != undefined) {
                        super.response(res, undefined, err);
                        return;
                    }

                    super.response(res, result, undefined);
                    return;
                case ROLES.TEACHER:
                    request.id = payload.teacher_id;
                    [result, err] = await this.teacherService.update(request);
                    if (err != undefined) {
                        super.response(res, undefined, err);
                        return;
                    }

                    super.response(res, result, undefined);
                    return;
            }

            super.response(res, {}, undefined);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    /**
     * @swagger
     * /v1/auth/login:
     *   post:
     *     description: Login to the application
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *          schema:
     *             type: object
     *             $ref: '#/components/schemas/LoginRequest'
     *     responses:
     *       200:
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *                type: object
     *                $ref: '#/components/schemas/LoginResponse'
     */
    async login(req, res) {
        const { username, password } = req.body;

        try {
            let [result, err] = await this.userService.login(username, password);

            if (err != undefined) {
                super.response(res, undefined, err);
                return;
            }

            if (!result) {
                super.response(res, undefined, ErrorList.ErrorNotFound);
                return;
            }

            super.response(res, result, undefined);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    /**
     * @swagger
     * /v1/auth/refresh:
     *   post:
     *     description: Refresh the access token
     *     tags: [Auth]
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/RefreshTokenRequest'
     *     responses:
     *       200:
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *                type: object
     *                $ref: '#/components/schemas/RefreshTokenResponse'
     */
    async refreshToken(req, res) {
        const { refresh_token } = req.body;
        let [result, err] = await this.userService.refresh(refresh_token);
        super.response(res, result, err);
    }

    /**
     * @swagger
     * /v1/auth/register:
     *   post:
     *     description: register new account
     *     tags: [Auth]
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/RegisterRequest'
     *     responses:
     *       200:
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *                type: object
     *                $ref: '#/components/schemas/RegisterResponse'
     */
    async register(req, res) {
        const { username, password, email, role_id } = req.body;
        let m = {
            username: username,
            password: password,
            email: email,
            role_id: role_id,
            status: 'active',
        };

        try {
            let [result, err] = await this.userService.create(m);
            if (err != undefined) {
                super.response(res, undefined, err);
                return;
            }

            super.response(res, result, undefined);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }

    }

    /**
     * @swagger
     * /v1/auth/bind:
     *   post:
     *     description: bind existing student/teacher to user account
     *     tags: [Auth]
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/BindRequest'
     *     responses:
     *       200:
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *                type: object
     *                $ref: '#/components/schemas/BindResponse'
     */
    async bind(req, res) {
        const { code, name, kind } = req.body;
        let m = {
            user_id: req.payload.user_id,
            code: code,
            name: name,
            kind: kind,
        }

        try {
            let [result, err] = await this.userService.bind(m);
            if (err != undefined) {
                super.response(res, undefined, err);
                return;
            }

            super.response(res, result, undefined);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


}

module.exports = {
    UserController,
}