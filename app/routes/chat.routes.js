const controller = require('../controllers/chat')

module.exports = function (app, event) {

    app.post('/chats/msgs', function (req, res) {
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


    app.post('/chats/msgs2', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;

        controller.saveAndSendMsg2(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/chats/markasread/:sender/:receiver', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { sender_id: req.params.sender, receiver_id: req.params.receiver };

        controller.markAsRead(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/chats/msgs/:sender/:receiver', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { sender_id: req.params.sender, receiver_id: req.params.receiver };
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