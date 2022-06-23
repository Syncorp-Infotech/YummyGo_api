const controller = require("../controllers/video");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = function (app, event) {
  app.post("/videos", function (req, res) {
    //console.log("Video", req.body);
    //console.log("Video", req.body);
    //console.log(">>>>>>>>>>", req.files);
    event.body = req.body;
    event.headers = req.headers;
    event.files = req.files;
    controller.createVideo(event, {
      done: function (rescode, resmsg) {
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.post("/createVideo_test", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    event.files = req.files;
    controller.createVideo_test(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.get("/videos/view/:id", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    event.pathParams = { id: req.params.id };

    controller.viewVideo(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.get("/videos/toptranding", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;

    controller.like_details(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.get("/videos/all", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    controller.listVideos_all(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.get("/videos/:user_id", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    event.pathParams = { user_id: req.params.user_id };
    event.queryParams = {
      type: req.query.type,
      page: req.query.page,
      limit: req.query.limit,
    };

    controller.listVideos(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  //// delete video /////
  app.delete("/videos/:video_id", function (req, res) {
    event.headers = req.headers;
    event.pathParams = { video_id: req.params.video_id };

    controller.deletevideo(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.post("/uploadVideo", (req, res) => {
    console.log("data in");
    console.log(req);
    event.body = req.body;
    event.headers = req.headers;
    event.files = req.files;
    controller.createVideo(event, {
      done: function (rescode, resmsg) {
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  // app.put("/:videoid", function (req, res) {
  //   event.body = req.body;
  //   event.headers = req.headers;
  //   event.pathParams = { id: req.params.videoid };
  //   controller.updatestatus(event, {
  //     done: function (rescode, resmsg) {
  //       res.header(resmsg.headers);
  //       res.status(resmsg.statusCode);
  //       res.send(resmsg.body);
  //     },
  //   });
  // });
  app.put("/video/unpublic/:videid", function (req, res) {
    event.body = req.body;
    console.log("event.bodt", event.body);
    event.headers = req.headers;
    event.pathParams = { id: req.params.videid };
    controller.updatestatus(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });
};
