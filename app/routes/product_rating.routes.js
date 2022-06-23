const controller = require('../controllers/product_rating');

module.exports = function (app, event) {

    ////// create product_rating /// 
    app.post('/product_rating', function (req, res) {
        event.body = req.body;

        controller.createproduct_rating(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });

    //// listing all product_rating /////
    app.get('/product_rating', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.getproduct_ratinglist(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    //// fetch product_rating by id ////
    app.get('/product_rating/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.getproduct_rating(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


     //// fetch product_rating by id ////
     app.get('/product_rating/:merc_id/:pr_product_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { pr_product_id: req.params.pr_product_id,pr_merchant_id : req.params.pr_merchant_id };
        console.log("*********************");
        controller.getproduct_ratinglist_by_profile(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    ///////update product_rating by id /////
    app.put('/product_rating/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.updateproduct_rating(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


     ///////update product_rating by id /////
     app.put('/product_rating/:catid/status', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.updateproduct_rating_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });




    //// delete product_rating /////
    app.delete('/product_rating/:catid', function (req, res) {
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.deleteproduct_rating(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

}