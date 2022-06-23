const controller = require('../controllers/video_chat');

module.exports = function (app, event) {

    ////// create video_chat /// 
    app.post('/video_chat', function (req, res) {
        event.body = req.body;

        controller.createvideo_chat(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });

    //// listing all video_chat /////
    app.get('/video_chat', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.queryParams = { page: req.query.page, limit: req.query.limit };

        controller.getvideo_chatlist(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    //// fetch video_chat by id ////
    app.get('/video_chat/fetch_chat/:video_id/:chat_merchat_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { chat_merchat_id: req.params.chat_merchat_id,video_id :req.params.video_id  };

        controller.getvideo_chat(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


     //// fetch video_chat by id ////
     app.get('/video_chat/count_status/:chat_merchat_id/:video_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { chat_merchat_id: req.params.chat_merchat_id,video_id :req.params.video_id  };
        controller.getvideo_chat_count_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    


     //// fetch video_chat by id ////
     app.get('/video_chat/profile_id/:catid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };
        console.log("*********************");
        controller.getvideo_chatlist_by_profile(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    ///////update video_chat by id /////
    app.put('/video_chat/:video_chat_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { video_chat_id: req.params.video_chat_id };

        controller.updatevideo_chat(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


     ///////update video_chat by id /////
     app.put('/video_chat/:catid/status', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.updatevideo_chat_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });




    //// delete video_chat /////
    app.delete('/video_chat/:catid', function (req, res) {
        event.headers = req.headers;
        event.pathParams = { cat_id: req.params.catid };

        controller.deletevideo_chat(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

}