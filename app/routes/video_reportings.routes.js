const controller = require('../controllers/video_reportings')

const multer = require('multer');
const upload = multer({dest:'uploads/'}).single("demo_image");



module.exports = function (app, event) {

    app.post('/video/addreport', function (req, res) {
        event.body 		= req.body;
        event.headers 	= req.headers;
        controller.createVideoReporting(event, {
            done: function (rescode, resmsg) {
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

}