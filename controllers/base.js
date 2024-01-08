const {AppError} = require('../errors/error')
const ErrorList = require('../errors/list')


class BaseController {
    /**
     * 
     * @param {*} c 
     * @param {*} data 
     * @param {AppError} err 
     * @returns 
     */
    response(c, data, err) {
        if (err != undefined) {
            c.status(err.status()).json({
                'meta': {
                    'code': err.code,
                    'message': err.message
                }
            });
            return;
        }

        if (data === undefined || data === null) {
            let err = ErrorList.ErrorNotFound
            c.status(err.status()).json({
                'meta': {
                    'code': err.code,
                    'message': err.message
                }
            });
            return;
        }

        c.status(200).json({
            'meta': {
                'code': 200,
                'message': 'success'
            },
            'data': data
        });
    }
}

module.exports = {
    BaseController
}