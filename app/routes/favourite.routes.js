const controller = require('../controllers/favourite')

module.exports = function (app, event) {

    app.post('/favourites', function (req, res) {
        console.log("favourite", req.body);
        event.body = req.body;
        event.headers = req.headers;
        controller.createfav(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/favourites/:customer_id/:merchant_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = {   customer: req.params.customer_id,
            merchant: req.params.merchant_id  };
        controller.viewfav(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/favourites/:user_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { user_id: req.params.user_id };
        controller.listfav(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.get('/favourites/merchat_like_count/:merchant_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        console.log("98767898789889",req.params.merchant_id);
        event.pathParams = { merchant_id: req.params.merchant_id };
        controller.merchant_id_listfav(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    //// delete favourite /////
    app.delete('/favourites/:mer_id/:cus_id', function (req, res) {
        event.headers = req.headers;
        event.pathParams = { mer_id: req.params.mer_id, cus_id: req.params.cus_id };
        controller.deletefav(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

}