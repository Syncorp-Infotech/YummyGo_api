const controller = require('../controllers/follow_detail');

module.exports = function (app, event) {

    ////// create follow_detail /// 
    app.post('/follow_detail', function (req, res) {
        event.body = req.body;

        controller.createfollow_detail(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });

    //// listing all follow_detail /////
    app.get('/follow_detail', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.getfollow_detaillist(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    //// fetch follow_detail by id ////
    app.get('/follow_detail/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.getfollow_detail(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.get('/follow_detail/count_status/:user_id/:merchant_id/:video_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { follow_detail_user_id: req.params.user_id,follow_detail_merchant_id : req.params.merchant_id,video_id :req.params.video_id};
        controller.getfollow_detail_count_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });



     //// fetch follow_detail by id ////
     app.get('/follow_detail/profile_id/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };
        console.log("*********************");
        controller.getfollow_detaillist_by_profile(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    ///////update follow_detail by id /////
    app.put('/follow_detail/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.updatefollow_detail(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


     ///////update follow_detail by id /////
     app.put('/follow_detail/:catid/status', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.updatefollow_detail_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });




    //// delete follow_detail /////
    app.delete('/follow_detail/:catid', function (req, res) {
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.deletefollow_detail(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

}