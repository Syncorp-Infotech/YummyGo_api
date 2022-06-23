const { send_response } = require("../../utils/app.util");
const { verifyToken } = require("../../utils/jwt.util");
const { Sequelize, QueryTypes } = require("sequelize");
const db = require("../../models");
const video_chat = db.video_chat;

exports.createvideo_chat = function (event, context) {
  var _data = event.body;
  console.log(_data);
  video_chat
    .create({
      video_id: _data.video_id,
      chat_user_id: _data.chat_user_id,
      chat_merchat_id: _data.chat_merchat_id,
      chat_like_data: _data.chat_like_data,
      chat_like_status: _data.chat_like_status,
      image: _data.image,
      location: _data.location,
      text: _data.text,
      type: _data.type,
      reply_record: _data.reply_record,
      user_created_date: _data.user_created_date,
      user_name: _data.user_name,
      user_image: _data.user_image,
      video_chat_status: "A",
    })
    .then((video_chats) => {
      context.done(null, send_response(200, video_chats));
    })
    .catch((err) => {
      context.done(null, send_response(500, { message: err.message }));
    });
};

exports.getcategorieslist = function (event, context) {
  var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
  var _limit = parseInt(
    event.queryParams.limit ? event.queryParams.limit : 100
  );
  var filter = {
    order: [["created_at", "DESC"]],
    offset: _offset,
    limit: _limit,
    where: { cat_status: "A" },
  };
  verifyToken(event.headers)
    .then((auther) => {
      video_chat
        .findAndCountAll(filter)
        .then((categories) => {
          context.done(null, send_response(200, categories));
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

exports.getvideo_chat = function (event, context) {
  console.log("eve", event.pathParams);
  verifyToken(event.headers)
    .then((auther) => {
      //video_chat
      // .findAndCountAll({
      //   where: {
      //     video_id: event.pathParams.video_id,
      //     chat_merchat_id: event.pathParams.chat_merchat_id,
      //   },
      // })
      db.sequelize
        .query(
          //"SELECT * From video_chat LEFT JOIN replay ON video_chat.video_chat_id = replay.replay_vedio_id",
          `select * from video_chat where chat_merchat_id= ${event.pathParams.chat_merchat_id} And video_id= ${event.pathParams.video_id}`,
          {
            raw: true,
            type: QueryTypes.SELECT,
          }
        )
        .then(async (video_chat) => {
          let replay_message = [];
          for (let index = 0; index < video_chat.length; index++) {
            const element = video_chat[index];
            await db.sequelize
              .query(
                //"SELECT * From video_chat LEFT JOIN replay ON video_chat.video_chat_id = replay.replay_vedio_id",
                `SELECT * From Replay where replay_video_id =${element.video_chat_id}`,
                {
                  bind: { video_chat_id: element.video_chat_id },
                  raw: true,
                  type: QueryTypes.SELECT,
                }
              )
              .then(async (value) => {
                element["replay"] = value;
                await replay_message.push(element);
              });
          }
          context.done(null, send_response(200, replay_message));
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

exports.getvideo_chat_count_status = function (event, context) {
  video_chat
    .findAndCountAll({
      where: {
        video_id: event.pathParams.video_id,
        chat_merchat_id: event.pathParams.chat_merchat_id,
      },
    })
    .then((like_detail) => {
      let a = { over_all_count: like_detail.count, like_status: false };
      context.done(null, send_response(200, a));
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

exports.getcategorieslist_by_profile = function (event, context) {
  console.log(event.pathParams.cat_id);
  var filter = {
    where: { created_by: event.pathParams.cat_id },
  };
  video_chat
    .findAndCountAll(filter)
    .then((categories) => {
      context.done(null, send_response(200, categories));
    })
    .catch((err) => {
      context.done(null, send_response(500, { message: err.message }));
    });
};

exports.updatevideo_chat = function (event, context) {
  var _data = event.body;
  video_chat
    .update(
      {
        chat_like_data: _data.chat_like_data,
      },
      {
        where: {
          video_chat_id: event.pathParams.video_chat_id,
        },
      }
    )
    .then((video_chat) => {
      context.done(
        null,
        send_response(200, { message: "video_chat updated successfully" })
      );
    })
    .catch((err) => {
      context.done(null, send_response(500, { message: err.message }));
    });
};

exports.updatevideo_chat_status = function (event, context) {
  var _data = event.body;
  verifyToken(event.headers)
    .then((auther) => {
      video_chat
        .update(
          {
            cat_status: _data.cat_status,
            cat_pid: _data.cat_pid,
            cat_reason: _data.cat_reason,
            updated_by: auther,
          },
          {
            where: {
              cat_id: event.pathParams.cat_id,
            },
          }
        )
        .then((video_chat) => {
          context.done(
            null,
            send_response(200, { message: "video_chat updated successfully" })
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

exports.deletevideo_chat = function (event, context) {
  verifyToken(event.headers)
    .then((auther) => {
      video_chat
        .destroy({
          where: { cat_id: event.pathParams.cat_id },
        })
        .then((video_chat) => {
          context.done(
            null,
            send_response(200, { message: "video_chat deleted successfully" })
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
