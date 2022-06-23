const controller = require('../controllers/order');

module.exports = function (app, event) {

    app.post('/orders', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        console.log(event);
        controller.createorder(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });

    app.get('/orders', function (req, res) {
        console.log(req.query);
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { merchant_id: req.query.merchant_id, page: req.query.page, limit: req.query.limit };

        controller.getorderslist(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/orders_merchant', function (req, res) {
        console.log(req.query);
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { merchant_id: req.query.merchant_id, page: req.query.page, limit: req.query.limit };
        console.log("Order details");
        controller.getorderslist_merchant(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/orders/merchants', function (req, res) {
        console.log('/orders/merchants Query -', req.query);
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { merchant_id: req.query.merchant_id, order_status: req.query.order_status, page: req.query.page, limit: req.query.limit };
        console.log("Order details");
        controller.listMerchantOrders(event, { // getorderslist_merchant
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/orders/merchants/status', function (req, res) {
        console.log(req.query);
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { merchant_id: req.query.merchant_id };
        controller.listMerchantOrderStatus(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.post('/orders_merchantwallet', function (req, res) {
        console.log(req.query);
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { merchant_id: req.query.merchant_id, page: req.query.page, limit: req.query.limit };

        controller.listWallets(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.post('/orders_merchantwallet_time', function (req, res) {
        console.log(req.body);
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { merchant_id: req.body.merchant_id };

        controller.walletToday(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.post('/orders_merchantwallet_date', function (req, res) {
        console.log(req.query);
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { merchant_id: req.body.merchant_id };

        controller.walletMonth(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.post('/orders_merchantwallet_year', function (req, res) {
        console.log(req.query);
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { merchant_id: req.body.merchant_id };
        controller.walletYear(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/orders_merchant/status', function (req, res) {
        console.log(req.query);
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { merchant_id: req.query.merchant_id, page: req.query.page, limit: req.query.limit, order_status: req.query.order_status };
        console.log("Order details");
        controller.getorderslist_merchant_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });
	
	app.get('/orders/history/:user_id', function (req, res) {
        event.headers = req.headers;
        console.log("********", req.params.user_id);
        event.pathParams = { user_id: req.params.user_id };
        controller.userordershistory(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });
	
	app.get('/orders/view/:order_id', function (req, res) {
        event.headers = req.headers;
        event.pathParams = { order_id: req.params.order_id };
        controller.uservieworder(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/orders/list/:user_id', function (req, res) {
        event.headers = req.headers;
        console.log("********", req.params.user_id);
        event.pathParams = { user_id: req.params.user_id };
        controller.userorderslist(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/orders/:orderid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { order_id: req.params.orderid };

        controller.getorder(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.put('/orders/:orderid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { order_id: req.params.orderid };

        controller.updateorder(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.put('/orders/:orderid/status', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { order_id: req.params.orderid };

        controller.updateorder_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.put('/orders/:orderid/status1', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { order_id: req.params.orderid };

        controller.updateOrderStatus(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.delete('/orders/:orderid', function (req, res) {
        event.headers = req.headers;
        event.pathParams = { order_id: req.params.orderid };

        controller.deleteorder(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

}