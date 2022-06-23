const { send_response } = require("../../utils/app.util");
const { verifyToken } = require("../../utils/jwt.util");
const { uploadFile } = require("../../utils/s3.util");
const db = require("../../models");
const video_reporting = db.video_reporting;

exports.createVideoReporting = function (event, context) {
  var _data = event.body;
  // console.log(db);
  // console.log(video_reporting);
  //verify token
  verifyToken(event.headers)
    .then((auther) => {
      //add reporting
      video_reporting
        .create({
          user_id: auther,
          video_id: _data.video_id,
          comment: _data.comment,
          created_by: auther,
        })
        .then((videoReportings) => {
          context.done(null, send_response(200, videoReportings));
        })
        .catch((err) => {
          context.done(null, send_response(500, { message: err.message }));
        });
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.listVideos_all = function (event, context) {
  var filter = {
    include: [
      {
        model: db.profile,
        attributes: [
          "profile_id",
          "profile_first_name",
          "profile_last_name",
          "profile_biz_name",
          "profile_biz_type",
          "profile_img",
        ],
        as: "merchant_info",
      },
    ],
    order: [["created_at", "DESC"]],
  };
  Video.findAndCountAll(filter)
    .then((videos) => {
      context.done(null, send_response(200, videos));
    })
    .catch((err) => {
      context.done(null, send_response(500, { message: err.message }));
    });
};
