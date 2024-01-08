const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ErrorList = require('../errors/list');
const { UserRepository } = require('../repositories/user');

/**
 * @class
 */
class UserService {
    /**
     * 
     * @param {UserRepository} userRepository 
     */
    constructor(userRepository) {
        if (!userRepository) {
            throw new Error('userRepository is required');
        }

        if (!(userRepository instanceof UserRepository)) {
            throw new Error('userRepository must be an instance of UserRepository');
        }

        
        Object.defineProperties(this, {
            /**
            * @type {UserRepository}
            */
            userRepository: {
                value: userRepository,
                writable: false
            }
        });
    }

    async getByUsername(username) { }
    async create(user) { }
    async login(username, password) {}
    async refresh(username, refreshToken) {}
}

/**
 * @class
 */
class userService extends UserService {
    /**
     * 
     * @param {UserRepository} userRepository 
     */
    constructor(userRepository) {
        super(userRepository);
    }

    async getByUsername(username) {
        let [result, err] = await this.userRepository.getByUsername(username);
        console.log('hi mom');
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

        // Generate a JWT token
        const token = jwt.sign({ userId: result.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: result.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1h' });
        
        let data = {
            access_token: token,
            refresh_token: refreshToken
        };

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
}

function newUserService(userRepository) {
    return new userService(userRepository);
}

module.exports = {
    UserService,
    newUserService
}