const controller = require('../controllers/location');

module.exports = function (app, event) {

    ////// create category /// 
    app.post('/location', function (req, res) {
        event.body = req.body;
        console.log(event.body);
        controller.createcategory(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        });
    });



    //// fetch category by id ////
    app.get('/location/:user_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { user_id: req.params.user_id };

        controller.getcategory(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    ///////update category by id /////
    app.get('/location/:user_id/default', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { user_id: req.params.user_id };
        controller.getdefault_location(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


     ///////update category by id /////
     app.put('/location/:old_id/:new_id', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { old_id: req.params.old_id , new_id: req.params.new_id };
        console.log("asdfasdfsdf",req.params.old_id,req.params.new_id);
        controller.updatecategory_status(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });




    //// delete category /////
    app.delete('/location/:loc_id', function (req, res) {
        event.headers = req.headers;
        event.pathParams = { loc_id: req.params.loc_id};
        controller.deletecategory(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

}