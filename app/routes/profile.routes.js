const controller = require('../controllers/profile')

const express = require("express")
const path = require("path")
const multer = require("multer")
const app = express();

module.exports = function (app, event) {

    app.get('/profile/:profileid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profileid }

        controller.viewProfile(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });



    app.get('/profile/view/:profileid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profileid }
        controller.viewProfile_view(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    } );


    app.get('/profile/detail/:profileid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profileid }
        controller.fetch_profile_detail(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    } );


    



    app.get('/profile_no/:profile_contact', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_contact: req.params.profile_contact }

        controller.checkmobile(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.get('/statelist/:profile_contact', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_contact: req.params.profile_contact }
        controller.statelist(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.put('/profile/:profileid', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profileid }
        console.log(req.body);
        controller.updateProfile(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.put('/profile/:profileid/picture', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profileid };
        event.files = req.files;

        controller.uploadProfileImg(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });

    app.put('/profile/:profileid/menucard', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profileid };
        event.files = req.files;

        controller.uploadMenucard(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.put('/profile/:profileid/idprofileone', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profileid };
        event.files = req.files;
        console.log(event.files);
        controller.uploadidprofileoneImg(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.put('/profile/:profileid/idprofiletwo', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profileid };
        event.files = req.files;

        controller.uploadidprofiletwoImg(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
        })
    });


    app.put('/profile/:profileid/idprofilethree', function (req, res) {
        event.body = req.body;
        event.headers = req.headers;
        event.pathParams = { profile_id: req.params.profileid };
        event.files = req.files;
        let sampleFile;
        let uploadPath;
        if (!req.files || Object.keys(req.files).length === 0) {
          res.error(300,'No files were uploaded.');
          return;
        }
        // var BaseUrl = 'http://localhost:3030/';
        var BaseUrl = 'http://3.1.85.1/api/';
        console.log('req.files >>>', req.files); // eslint-disable-line
        sampleFile = req.files.profileimg;
        uploadPath = __dirname + '/uploads/' + sampleFile.name;
        var Finalpath =  BaseUrl + sampleFile.name;
         console.log("uploaded path",uploadPath )
         console.log("filePath",Finalpath);
        sampleFile.mv(uploadPath, function(err) {
          if (err) {
         console.log(err)
         return res.error(500, "Internal server error");
          }
          event.body.filepath = Finalpath;
          controller.uploadidprofilethreeImg(event, {
            done: function (rescode, resmsg) {
                res.header(resmsg.headers);
                res.status(resmsg.statusCode)
                res.send(resmsg.body)
            }
            })
        //  res.json({Status:"Success",Message:"file upload success", Data :Finalpath,Code:200});
        });
    });



}