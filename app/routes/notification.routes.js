const controller = require('../controllers/notification')

module.exports = function (app, event) {

    app.put('/notifications/:profileid/markasread', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profileid };

        controller.markAsRead(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });

    app.get('/notifications/:profileid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profileid };

        controller.notificationsList(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });
}