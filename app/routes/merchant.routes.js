const controller = require('../controllers/user')

module.exports = function (app, event) {

    app.get('/merchants/nearby', function (req, res) {
        event.body = { role: 2 };
        event.headers = req.headers;
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.listUsers(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.post('/merchants/appdashboard', function (req, res) {
        event.body = req.body;
        event.body["role"] = 2;
        event.headers = req.headers;
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.merchantslist(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });
}