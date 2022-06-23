const controller = require('../controllers/user')

module.exports = function (app, event) {

    app.get('/users', function (req, res) {
        event.body = { role: 1 };
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

    app.get('/users/merchants', function (req, res) {
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

    app.get('/users/vendors', function (req, res) {
        event.body = { role: 3 };
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

    app.get('/users/subvendors', function (req, res) {
        event.body = { role: 6 };
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

    app.get('/users/riders', function (req, res) {
        event.body = { role: 4 };
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

    app.get('/users/customers', function (req, res) {
        event.body = { role: 5 };
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

    app.get('/users/:userid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { user_id: req.params.user_id };

        controller.userDetail(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.get('/users/chats/:user_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { user_id: req.params.user_id };
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.userChatsList(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/users/referel/:user_id', function (req, res) {
        event.body 			= req.body;
        event.headers 		= req.headers;
        event.pathParams 	= { user_id: req.params.user_id };
        controller.fetch_referel_code(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.put('/users/tokens/:user_id/mobile', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { user_id: req.params.user_id };

        controller.updateMobileToken(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.put('/users/tokens/:user_id/web', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { user_id: req.params.user_id };

        controller.updateWebToken(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });
}