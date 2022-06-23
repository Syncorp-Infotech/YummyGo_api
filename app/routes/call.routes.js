const controller = require('../controllers/call')

module.exports = function (app, event) {

    app.get('/calls/accesstocken', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { profile_id: req.query.profile_id };

        controller.twilioAccessTocken(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.post('/calls', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;

        controller.saveAndSendMsg(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/calls/:caller/:receiver', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { caller_id: req.params.caller, receiver_id: req.params.receiver };
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.msgsList(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });
}