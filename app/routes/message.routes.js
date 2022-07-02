const controller = require('../controllers/message')

module.exports = function (app, event) {

    app.post('/message', function (req, res) {
        event.body = { profile_id: req.body.profile_id, message:req.body.message};
        event.headers = req.headers;
    
        controller.createMessage(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });
    app.get('/message', function (req, res) {
        event.body = { profile_id: req.query.profile_id};
        event.headers = req.headers;
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.getMessageList(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

}