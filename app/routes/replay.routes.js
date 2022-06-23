const controller = require("../controllers/replay/replay");

const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();

module.exports = function (app, event) {
  app.post("/replay", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    // event.pathParams = {
    //   user_id: req.params.userid,
    //   vedio_id: req.params.vedioid,
    //   replay_id: req.params.replayid,
    // };
    console.log("address", event);

    controller.replay(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });
  app.get("/listreplay/:userid", function (req, res) {
    console.log("entered");
    // event.body = req.body;
    // event.headers = req.headers;
    event.pathParams = { user_id: req.params.userid };
    console.log("id", event);
    controller.listReplay(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });
  app.put("/replay/:replayid", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    event.pathParams = { replay_id: req.params.replayid };
    controller.updatemessage(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });
};

//// delete Address /////
app.delete("/delete/:addressid", function (req, res) {
  event.headers = req.headers;
  event.pathParams = { Address_id: req.params.addressid };
  controller.deleteAddress(event, {
    done: function (rescode, resmsg) {
      res.header(resmsg.headers);
      res.status(resmsg.statusCode);
      res.send(resmsg.body);
    },
  });
});
