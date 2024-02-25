const bcrypt = require('bcrypt');
const { BaseController } = require('./base');
const { UserService } = require('../services/user');
const ErrorList = require('../errors/list');
const jwt = require('jsonwebtoken');

class UserController extends BaseController {
    constructor(userService) {
        super();

        if (!userService) {
            throw new Error('userService is required');
        }

        if (!(userService instanceof UserService)) {
            throw new Error('userService must be an instance of UserService');
        }

        Object.defineProperties(this, {
            userService: {
                value: userService,
                writable: false
            }
        });
    }

    async get(req, res) {
        let request = {
            access_token: req.headers.authorization,
        }

        let payload = jwt.verify(request.access_token, process.env.JWT_SECRET);
        super.response(res, {payload}, undefined);
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