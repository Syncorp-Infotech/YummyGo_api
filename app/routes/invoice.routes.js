const controller = require('../controllers/invoice')

module.exports = function (app, event) {

    app.post('/invoices', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.files = req.files;

        controller.createInvoice(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/invoices/:id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { id: req.params.id };

        controller.viewInvoice(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/invoices/:profile_id/sent', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profile_id };
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.listSentInvoices(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/invoices/:profile_id/received', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profile_id };
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.listReceivedInvoices(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });
}