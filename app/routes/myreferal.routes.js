const controller = require("../controllers/myreferal/myreferal");

const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();

module.exports = function (app, event) {
  app.get("/myreferal/:profileid", function (req, res) {
    event.pathParams = { profile_id: req.params.profileid };
    event.headers = req.headers;

    controller.Myreferallist(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });
  app.get("/myreferal_orderlist/:profileid", function (req, res) {
    console.log("entered");
    // event.body = req.body;
    event.headers = req.headers;
    event.pathParams = { profile_id: req.params.profileid };
    console.log("id", event);
    controller.listorder(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });
  app.put("/update/:addressid", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    event.pathParams = { address_id: req.params.addressid };
    controller.updateAddress(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

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
};
