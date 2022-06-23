const controller = require('../controllers/neworder');

module.exports = function (app, event) {

    ////// create neworder /// 
    app.post('/neworder', function (req, res) {
        event.body = req.body;

        controller.createneworder(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });


    app.post('/neworder/update_order_status', function (req, res) {
        event.body = req.body;
        controller.update_order_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });

    //// listing all neworder /////
    app.get('/neworder', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.getneworderlist(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    //// fetch neworder by id ////
    app.get('/neworder/:user_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { user_id: req.params.user_id };
        console.log("*****user id",req.params.user_id);
        controller.getneworder(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


      //// fetch neworder by merchant id ////
      app.get('/neworder/merchant/:user_id/:order_status', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { user_id: req.params.user_id };
        console.log("*****user id",req.params.user_id);
        controller.merchant_getneworder(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


         //// fetch neworder by merchant id ////
        app.get('/neworder/merchantoverall/:user_id/:order_status', function (req, res) {
            event.body = req.body;
            event.headers = req.headers;
            event.pathParams = { user_id: req.params.user_id,
                order_status : req.params.order_status
             };
            console.log("*****user id",req.params.user_id);
            controller.overall_merchant_getneworder(event, {
                done: function (rescode, resmsg) {
                    res.header(resmsg.headers);
                    res.status(resmsg.statusCode)
                    res.send(resmsg.body)
                }
            })
        });



    app.get('/neworder/fetch_rating/:merchant_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { merchant_id: req.params.merchant_id };
        console.log("*****user id",req.params.merchant_id);
        controller.get_rating_neworder(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    

     //// fetch neworder by id ////
     app.get('/neworder/profile_id/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.getneworderlist_by_profile(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });



    app.get('/neworder/rider_count/:rider_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { rider_id: req.params.rider_id };

        controller.getneworderlist_by_rider_id(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    


    app.get('/neworder/status_list/:rider_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { rider_id: req.params.rider_id };
        controller.getneworderlist_by_status_list(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });



    
    ///////update neworder by id /////
    app.put('/neworder/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.updateneworder(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


     ///////update neworder by id /////
     app.put('/neworder/merchant/:order_id/status', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { order_id: req.params.order_id };
        controller.updateneworder_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });




    //// delete neworder /////
    app.delete('/neworder/:catid', function (req, res) {
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.deleteneworder(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });



       ////// create neworder /// 
    app.post('/neworder/update_merchant_rate', function (req, res) {
        event.body = req.body;
        controller.updateneworder_merchant_rating(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });


    app.post('/neworder/update_rider_rate', function (req, res) {
        event.body = req.body;
        controller.updateneworder_rider_rating(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });



      //// fetch neworder by id ////
      app.get('/neworder/check_order_status/:rider_id/:status', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { 
            user_id: req.params.rider_id,
            order_driver_status: req.params.status,
        
        };
        console.log("*****user id",req.params.rider_id);
        controller.getneworder_check_order_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


        //// fetch neworder by id ////
        app.get('/neworder/check_otp/:rider_id/:otp', function (req, res) {
            event.body = req.body;
            event.headers = req.headers;
            event.pathParams = { 
                order_id: req.params.rider_id,
                order_driver_otp: req.params.otp,
            
            };
            console.log("*****user id",req.params.rider_id);
            controller.getneworder_check_otp(event, {
                done: function (rescode, resmsg) {
                    res.header(resmsg.headers);
                    res.status(resmsg.statusCode)
                    res.send(resmsg.body)
                }
            })
        });



}