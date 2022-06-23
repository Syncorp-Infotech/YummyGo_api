const controller = require("../controllers/addrress/address");

const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();

module.exports = function (app, event) {
  app.post("/address", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    console.log("address", event);

    controller.address(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });
  app.get("/address/:userid", function (req, res) {
    console.log("entered");
    // event.body = req.body;
    event.headers = req.headers;
    event.pathParams = { user_id: req.params.userid };
    console.log("id", event);
    controller.listAddress(event, {
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
