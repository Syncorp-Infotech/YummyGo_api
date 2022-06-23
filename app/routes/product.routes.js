const controller = require('../controllers/prodcut');
module.exports = function (app, event) {

    app.post('/products', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;

        controller.createproduct(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });

    app.get('/products', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.getproductslist(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/products/:prodid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { prod_id: req.params.prodid };
        event.queryParams = { data: req.query.data, page: req.query.page, limit: req.query.limit };

        controller.getproduct(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.put('/products/:prodid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { prod_id: req.params.prodid };

        controller.updateproduct(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.put('/products/:prodid/status', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { prod_id: req.params.prodid };

        controller.updateproduct_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.put('/products/:prodid/images', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { prod_id: req.params.prodid };
        event.files = req.files;

        controller.uploadProdImg(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.delete('/products/:prodid', function (req, res) {
        event.headers = req.headers;
        event.pathParams = { prod_id: req.params.prodid };

        controller.deleteproduct(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    /**
     * Products List By Category
     */
     app.get('/categories/:catid/products', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.getproductslistbycatid(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    /**
     * Products List By Merchants
     */
     app.get('/merchants/:profileid/products', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profileid };
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.getproductslistbymerchant(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });
}