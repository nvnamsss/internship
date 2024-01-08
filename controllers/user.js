const bcrypt = require('bcrypt');
const { BaseController } = require('./base');
const { UserService } = require('../services/user');


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

    /**
     * @swagger
     * /login:
     *   post:
     *     description: Login to the application
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
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

    async refreshToken(req, res) {
        const { refresh_token } = req.body;
        let [result, err] = await this.userService.refresh(refresh_token);
        super.response(res, result, err);
    }

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
}

module.exports = {
    UserController,
}