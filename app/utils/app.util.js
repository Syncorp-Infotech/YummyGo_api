const randomstring = require('randomstring');

const send_response = (status, body) => {
    var response = {
        headers: {
            "Content-Type": "application/json"
        },
        statusCode: status,
        body: JSON.stringify(body),
    };
    return response;
};

const send_response_ = (status, body) => {
    var response = {
        headers: {
            "Content-Type": "text/html"
        },
        statusCode: status,
        body: new Buffer(body),
    };
    return response;
};

const uniqueId = (_length) => {
    // return randomstring.generate(10);
    return randomstring.generate({
        length: _length,
        charset: 'numeric'
    });
}

const uniqueString = (_length) => {
    // return randomstring.generate(10);
    return randomstring.generate({
        length: _length,
        charset: 'alphabetic'
    });
}

const uniqueNameId = (_name) => {
    var name = _name.replace(' ', '').replace('.', '').substr(0, 3).toUpperCase();
    var serial = randomstring.generate({
        length: 3,
        charset: 'numeric'
    });
    return 'CARE' + name + serial;
}

module.exports = {
    send_response,
    send_response_,
    uniqueId,
    uniqueNameId,
    uniqueString
}