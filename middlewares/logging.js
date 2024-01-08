
function log(req, res, next) {
    console.log('Time:', Date.now());
    next();
}