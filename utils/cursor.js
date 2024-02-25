var zlib = require('zlib');

function DecodeCursor(cursor) {
    if (cursor === undefined) {
        return {
            cursor: 0,
        };
    }

    let decoded = Buffer.from(cursor, 'base64').toString('utf8');
    return JSON.parse(decoded);
}

function EncodeCursor(next_id) {
    let cursor = JSON.stringify({
        cursor: next_id,
    });

    let encoded = Buffer.from(cursor).toString('base64');
    return encoded;
}

module.exports = {
    DecodeCursor,
    EncodeCursor
}