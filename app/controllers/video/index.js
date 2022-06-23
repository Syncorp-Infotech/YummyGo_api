const { send_response } = require("../../utils/app.util");
const { verifyToken } = require("../../utils/jwt.util");
const { uploadFile } = require("../../utils/s3.util");
const db = require("../../models");
const { sendFCM_NV } = require("../../firebase");
const { Sequelize, QueryTypes, JSON } = require("sequelize");
const videoFile = "../video/video.mp4";
var multiparty = require("multiparty");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const { json } = require("body-parser");
// const { json } = require("body-parser");
// ffmpeg.setFfmpegPath(ffmpegPath);
const Video = db.video;
const Video_like = db.like_detail;

exports.createVideo = function (event, context) {
  var _data = event.body;
  const file = event.files.doc_video;
  //const file01 = event.files.files;
  console.log("request", _data);
  //let process = new ffmpeg(file01._data);

  uploadFile(file, "myvideos")
    .then((fileurl) => {
      console.log(fileurl);
      console.log(new Date());
      console.log("data", data);
      Video.create({
        profile_id: _data.user_id,
        video_link: fileurl,
        video_type: _data.type,
        video_note: _data.note,
        video_status: "A",
      })
        .then((video) => {
          console.log("video", video);
          context.done(null, send_response(200, video));
        })
        .catch((err) => {
          console.log(err);
          context.done(null, send_response(500, { message: err.message }));
        });
    })
    .catch((err) => {
      console.log("err", err);
      // context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    });
};

exports.createVideo_test = function (event, context) {
  var _data = event.body;
  const file = event.files.doc_video;
  uploadFile(file, "myvideos")
    .then((fileurl) => {
      console.log(fileurl);
      console.log(new Date());
      Video.create({
        profile_id: _data.user_id,
        video_link: fileurl,
        video_type: _data.type,
        video_note: _data.note,
        video_status: "A",
      })
        .then((video) => {
          sendFCM_NV(video);

          context.done(null, send_response(200, video));
        })
        .catch((err) => {
          console.log(err);
          context.done(null, send_response(500, { message: err.message }));
        });
    })
    .catch((err) => {
      console.log("err", err);
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 400, {
          message: err.message,
        })
      );
    });
};

exports.viewVideo = function (event, context) {
  verifyToken(event.headers)
    .then((valid) => {
      var filter = {
        include: [
          {
            model: db.profile,
            attributes: [
              "profile_id",
              "profile_first_name",
              "profile_last_name",
              "profile_biz_name",
              "profile_img",
            ],
            as: "merchant_info",
          },
        ],
        where: {
          id: event.pathParams.id,
        },
      };

      Video.findOne(filter)
        .then((post) => {
          context.done(null, send_response(200, post));
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

exports.deletevideo = function (event, context) {
  verifyToken(event.headers)
    .then((auther) => {
      Video.destroy({
        where: { id: event.pathParams.video_id },
      })
        .then((category) => {
          context.done(
            null,
            send_response(200, { message: "Video deleted successfully" })
          );
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

exports.listVideos = function (event, context) {
  verifyToken(event.headers)
    .then((valid) => {
      var filter = {
        where: {
          profile_id: event.pathParams.user_id,
        },
        order: [["created_at", "DESC"]],
      };
      Video.findAndCountAll(filter)
        .then((videos) => {
          context.done(null, send_response(200, videos));
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

exports.like_details = function (event, context) {
  console.log("eve", event.pathParams);
  verifyToken(event.headers)
    .then((auther) => {
      db.sequelize
        .query(`select * from video`, {
          raw: true,
          type: QueryTypes.SELECT,
        })
        .then(async (video_detail) => {
          let like_detail = [];
          for (let index = 0; index < video_detail.length; index++) {
            const element = video_detail[index];
            await db.sequelize
              .query(
                //"SELECT * From video_chat LEFT JOIN replay ON video_chat.video_chat_id = replay.replay_vedio_id",
                `SELECT * From like_detail where video_id = ${element.id}`,
                {
                  bind: { video_chat_id: element.video_chat_id },
                  raw: true,
                  type: QueryTypes.SELECT,
                }
              )
              .then(async (value) => {
                console.log("value", value);
                element["like_details"] = value;
                element["like_count"] = value.length;
                await like_detail.push(element);
              });
          }

          // function compare(a, b) {
          //   console.log("a", a);
          //   console.log("b", b);
          //   if (a.like_count < b.like_count) {
          //     return -1;
          //   }
          //   if (a.like_count > b.like_count) {
          //     return 1;
          //   }
          //   return 0;
          // }
          // let sort = compare(like_detail);

          //          console.log("sort", sort);
          let compar = video_detail.sort(function (a, b) {
            return b.like_count - a.like_count;
          });
          console.log("compar", compar);
          context.done(null, send_response(200, compar));
        })
        .catch((err) => {
          context.done(
            null,
            send_response(err.status_code ? err.status_code : 400, {
              message: err.message,
            })
          );
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

exports.updatestatus = function (event, context) {
  var _video = event.body;
  var _id = event.pathParams;
  console.log("_video", _video);
  console.log("_id", _id);
  let video = _video.body == "A" ? "N" : "A";
  Video.update(
    {
      video_status: video,
      video_note: _video.video_note,
    },
    {
      where: {
        id: _id.id,
      },
    }
  )
    .then((profile) => {
      console.log("profile", profile);
      context.done(
        null,
        send_response(200, {
          Message: "updated Successfully",
        })
      );
    })
    .catch((err) => {
      context.done(null, send_response(500, { message: err.message }));
    });
};
