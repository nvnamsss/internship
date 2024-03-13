const config = require('config');

function score2status(score) {
    let threshold = config.get('score.pass_threshold');
    
    if (score >= threshold) {
        return "passed";
    }

    return "failed";
}

module.exports = {
    score2status,
}