const controller = require('../controllers/like_detail');

module.exports = function (app, event) {

    ////// create like_detail /// 
    app.post('/like_detail', function (req, res) {
        event.body = req.body;
        controller.createlike_detail(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });

    //// listing all like_detail /////
    app.get('/like_detail', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.getlike_detaillist(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    //// fetch like_detail by id ////
    app.get('/like_detail/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };
        controller.getlike_detail(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.get('/like_detail/count_status/:user_id/:merchant_id/:video_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { user_id: req.params.user_id,merchant_id : req.params.merchant_id,
            video_id :req.params.video_id   };
        controller.getlike_detail_count_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


     //// fetch like_detail by id ////
     app.get('/like_detail/profile_id/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };
        console.log("*********************");
        controller.getlike_detaillist_by_profile(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    ///////update like_detail by id /////
    app.put('/like_detail/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.updatelike_detail(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


     ///////update like_detail by id /////
     app.put('/like_detail/:catid/status', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.updatelike_detail_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });




    //// delete like_detail /////
    app.delete('/like_detail/:catid', function (req, res) {
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.deletelike_detail(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

}