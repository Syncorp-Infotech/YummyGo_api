const controller = require('../controllers/promocode');

module.exports = function (app, event) {

    ////// create category /// 
    app.post('/promocode', function (req, res) {
        event.body = req.body;
        controller.createpromocode(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });

    //// listing all category /////
    app.get('/promocode', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.getpromocodelist(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    //// fetch category by id ////
    app.get('/promocode/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.getpromocode(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.get('/promocode/available/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };
        controller.getpromocode_available(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

     app.get('/promocode/availables/user', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        console.log("following");
        // event.pathParams = { cat_id: req.params.catid };
        controller.getpromocode_available_user(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    

    ///////update category by id /////
    app.put('/promocode/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { promocode_id: req.params.catid };

        controller.updatepromocode(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


     ///////update category by id /////
     app.put('/promocode/:catid/status', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { promocode_id: req.params.catid };

        controller.updatepromocode_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.put('/promocode/:catid/date', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { promocode_id: req.params.catid };

        controller.updatepromocode_date(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });



    




    //// delete category /////
    app.delete('/promocode/:catid', function (req, res) {
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.deletepromocode(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

}