const { WrapError } = require('../errors/error');
const {MajorRepository} = require('../repositories/major');
const ErrorList = require('../errors/list');

class MajorService {
    constructor(majorRepository) {
        if (!majorRepository) {
            throw new Error('majorRepository is required');
        }

        if (!(majorRepository instanceof MajorRepository)) {
            throw new Error('majorRepository must be an instance of MajorRepository');
        }

        Object.defineProperties(this, {
            majorRepository: {
                value: majorRepository,
                writable: false
            }
        });
    }
    
    getAll() {
    }
    
    getById(id) {
    }
}

class majorService extends MajorService {
    constructor(majorRepository) {
        super(majorRepository);

        /**
         * @type {MajorRepository}
         */
        this.majorRepository;
    }

    async getAll() {
        let [result, err] = await this.majorRepository.search({ cursor: '', page_size: -1 });
        if (err != undefined) {
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }

        return [result, undefined];
    }

    async getById(id) {
        let [result, err] = await this.majorRepository.get(id);
        if (err != undefined) {
            return [undefined, WrapError(ErrorList.ErrorInternalServer, err.message)];
        }
        
        return [result, undefined];
    }
}

/**
 * 
 * @param {MajorRepository} majorRepository 
 * @returns 
 */
function newMajorService(majorRepository) {
    return new majorService(majorRepository);
}

module.exports = {
    MajorService,
    newMajorService
}