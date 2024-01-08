

const statusBase = 10000
const moduleBase = 100
const codeBase = 1

class AppError extends Error{
    constructor(message, code) {
        super(message);
        this.code = code;
    }

    status() {
        return Math.floor(this.code / statusBase);
    }

    module() {
        return (this.code / moduleBase) % moduleBase;
    }

    detailCode() {
        return this.code % codeBase;
    }
}

function NewError(message, status, module, detailCode) {
    let code = parseInt(`${status}${module.toString().padStart(2, '0')}${detailCode.toString().padStart(2, '0')}`, 10);
    console.log('aaaa', `${status}${module.toString().padStart(2, '0')}${detailCode.toString().padStart(2, '0')}`)
    console.log('code', code);
    return new AppError(message, code);
}

module.exports = {
    AppError,
    NewError,
}