const controller = require('../controllers/newchat');

module.exports = function (app, event) {

    ////// create newchat /// 
    app.post('/newchat', function (req, res) {
        event.body = req.body;

        controller.createnewchat(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });

    //// listing all newchat /////
    app.get('/newchat', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.getnewchatlist(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    //// fetch newchat by id ////
    app.get('/newchat/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.getnewchat(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


     //// fetch newchat by id ////
     app.get('/newchat/profile_id/:chat_reciver_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { chat_reciver_id: req.params.chat_reciver_id };

        controller.getnewchatlist_by_profile(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.get('/newchat/both/:chat_sender_id/:chat_reciver_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { chat_reciver_id: req.params.chat_reciver_id, chat_sender_id:req.params.chat_sender_id };
        controller.getnewchatlist_by_both(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.get('/newchat/chatname/:chat_name', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { chat_name: req.params.chat_name};
        controller.getnewchatlist_by_chat_name(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });



    app.get('/newchat/reciver/:chat_reciver_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { chat_reciver_id: req.params.chat_reciver_id};
        controller.getnewchatlist_by_chat_reciver_id(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.get('/newchat/chatreadstatus/:chat_name/:chat_reciver_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { chat_name: req.params.chat_name , chat_reciver_id : req.params.chat_reciver_id} ;
        controller.getnewchatlist_by_chat_name_chatreadstatus(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    

    ///////update newchat by id /////
    app.put('/newchat/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.updatenewchat(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


     ///////update newchat by id /////
     app.put('/newchat/:catid/status', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.updatenewchat_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });




    //// delete newchat /////
    app.delete('/newchat/:catid', function (req, res) {
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.deletenewchat(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

}