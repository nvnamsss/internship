const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ErrorList = require('../errors/list');
const { WrapError } = require('../errors/error');
const { UserRepository } = require('../repositories/user');
const { TeacherRepository } = require('../repositories/teacher');
const { StudentRepository } = require('../repositories/student');



const USER_KIND_ADMIN = 'admin';
const USER_KIND_TEACHER = 'teacher';
const USER_KIND_STUDENT = 'student';

const roleNames = {
    1: USER_KIND_ADMIN,
    2: USER_KIND_TEACHER,
    3: USER_KIND_STUDENT,
};

/**
 * @class
 */
class UserService {
    /**
     * 
     * @param {UserRepository} userRepository 
     * @param {TeacherRepository} teacherRepository
     * @param {StudentRepository} studentRepository
     */
    constructor(userRepository, teacherRepository, studentRepository) {
        if (!userRepository) {
            throw new Error('userRepository is required');
        }

        if (!(userRepository instanceof UserRepository)) {
            throw new Error('userRepository must be an instance of UserRepository');
        }

        
        if (!studentRepository) {
            throw new Error('studentRepository is required');
        }

        if (!(studentRepository instanceof StudentRepository)) {
            throw new Error('studentRepository must be an instance of StudentRepository');
        }

        if (!teacherRepository) {
            throw new Error('teacherRepository is required');
        }

        if (!(teacherRepository instanceof TeacherRepository)) {
            throw new Error('teacherRepository must be an instance of TeacherRepository');
        }

        Object.defineProperties(this, {
            /**
            * @type {UserRepository}
            */
            userRepository: {
                value: userRepository,
                writable: false
            },
            teacherRepository: {
                value: teacherRepository,
                writable: false
            },
            studentRepository: {
                value: studentRepository,
                writable: false
            }
        });
    }

    async getByUsername(username) { }
    async create(user) { }
    async login(username, password) { }
    async refresh(username, refreshToken) { }
    async bind(req) { }
}

/**
 * @class
 */
class userService extends UserService {
    /**
     * 
     * @param {UserRepository} userRepository 
     */
    constructor(userRepository, teacherRepository, studentRepository) {
        super(userRepository, teacherRepository, studentRepository);

        /**
         * @type {UserRepository}
         */
        this.userRepository;

        /**
         * @type {TeacherRepository}
         */
        this.teacherRepository;

        /**
         * @type {StudentRepository}
         */
        this.studentRepository;
    }


    async getByUsername(username) {
        let [result, err] = await this.userRepository.getByUsername(username);
        if (err != undefined) {
            return [undefined, err];
        }

        if (result == undefined) {
            return [undefined, ErrorList.ErrorNotFound];
        }

        return [result, undefined];
    }

    async create(user) {
        user.password = await bcrypt.hash(user.password, 10);

        let [result, err] = this.userRepository.create(user);
        if (err != undefined) {
            return [undefined, err];
        }

        return [result, undefined];
    }

    async getUserInfo(req) {
        let user_id = req.user_id;

        let [result, err] = await this.userRepository.getByID(user_id);
        if (err != undefined) {
            return [undefined, err];
        }

        let roleName = roleNames[result.role_id]
        let data = {
            role_name: roleName,
            role_id: result.role_id,
        };


        switch (roleName) {
            case USER_KIND_ADMIN:
                break;
            case USER_KIND_TEACHER:
                if (result.binding != undefined) {
                    let [teacher, teacherErr] = await this.teacherRepository.get(result.binding);
                    if (teacherErr != undefined) {
                        console.log('get teacher by id got error', err);
                        return [undefined, WrapError(ErrorList.ErrorInternalServer, teacherErr.message)];
                    }
                    data.user_info = teacher;
                }
                break;
            case USER_KIND_STUDENT:
                if (result.binding != undefined) {
                    let [student, studentErr] = await this.studentRepository.get(result.binding);
                    if (studentErr != undefined) {
                        console.log('get student by id got error', err);
                        return [undefined, WrapError(ErrorList.ErrorInternalServer, studentErr.message)];
                    }
                    data.user_info = student;
                }
                break;
            default:
                console.log('invalid role', roleName);
                return [undefined, ErrorList.ErrorInvalidRole];
        }

        return [data, undefined];
    }

    async updateUserInfo(req) {

    }

    async login(username, password) {
        let [result, err] = await this.getByUsername(username);

        if (err != undefined) {
            return [undefined, err];
        }

        if (!result) {
            return [undefined, ErrorList.ErrorNotFound];
        }

        // Compare the provided password with the stored password
        const isPasswordValid = await bcrypt.compare(password, result.password);

        // Check if the password is valid
        if (!isPasswordValid) {
            return [undefined, ErrorList.ErrorInvalidPassword];
        }

        let payload = {
            user_id: result.id,
            role_id: result.role_id,
        }

        let roleName = roleNames[result.role_id]
        let data = {
            role_name: roleName,
            role_id: result.role_id,
        };

        switch (roleName) {
            case USER_KIND_ADMIN:
                break;
            case USER_KIND_TEACHER:
                if (result.binding != undefined) {
                    payload['teacher_id'] = result.binding;
                }
                break;
            case USER_KIND_STUDENT:
                if (result.binding != undefined) {
                    payload['student_id'] = result.binding;
                }
                break;
            default:
                console.log('invalid role', roleName);
                return [undefined, ErrorList.ErrorInvalidRole];
        }

        // Generate a JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ user_id: result.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1h' });

        data.access_token= token
        data.refresh_token= refreshToken

        // Return the token to the client
        return [data, undefined];
    }

    async refresh(refreshToken) {
        try {
            // Verify the refresh token
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            // Find the user by ID
            const user = await this.userRepository.getByID(decoded.userId);

            // Check if the user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Generate a new JWT token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            let data = {
                access_token: token,
            }
            // Return the new token to the client
            return [data, undefined];
        } catch (error) {
            console.error(error);
            return [undefined, ErrorList.ErrorInternalServer];
        }
    }

    async bind(req) {
        let { user_id, code, name } = req;
        let [user, err] = await this.userRepository.getByID(user_id);
        if (err != undefined) {
            console.log('get user by id got error', err);
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }

        let changed = false;
        let kind = roleNames[user.role_id];
        switch (kind) {
            case USER_KIND_TEACHER:
                let [teacher, teacherErr] = await this.teacherRepository.getByCode(code);
                if (teacherErr != undefined) {
                    console.log('get teacher by code got error', err);
                    return [undefined, teacherErr];
                }

                if (teacher == undefined) {
                    // [teacher, teacherErr] = await this.teacherRepository.create({
                    //     code: code,
                    //     name: name
                    // })

                    // if (teacherErr != undefined) {
                    //     console.log('create teacher by code got error', err);
                    //     return [undefined, teacherErr];
                    // }

                    console.log('get teacher got error', err);
                    return [undefined, WrapError(ErrorList.ErrorNotFound, teacherErr.message)];
                }

                user.binding = teacher.id;
                changed = true;
                break;
            case USER_KIND_STUDENT:
                let [student, studentErr] = await this.studentRepository.getByCode(code);
                if (studentErr != undefined) {
                    console.log('get student by code got error', err)
                    return [undefined, studentErr];
                }

                if (student == undefined) {
                    console.log('get student got error', err);
                    return [undefined, WrapError(ErrorList.ErrorNotFound, studentErr.message)];

                    // [student, studentErr] = await this.studentRepository.create({
                    //     code: code,
                    //     name: name
                    // })

                    // if (studentErr != undefined) {
                    //     console.log('create student by code got error', err);
                    //     return [undefined, studentErr];
                    // }
                }

                user.binding = student.id;
                changed = true;
                break;
        }

        if (changed) {
            [user, err] = await this.userRepository.updateBinding(user);
            if (err != undefined) {
                console.log('update user got error', err);
                return [undefined, ErrorList.ErrorInternalServer];
            }
        }

        return [{}, undefined];
    }
}

function newUserService(userRepository, teacherRepository, studentRepository) {
    return new userService(userRepository, teacherRepository, studentRepository);
}

module.exports = {
    UserService,
    newUserService
}