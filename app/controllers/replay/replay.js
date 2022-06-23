const { send_response, uniqueId } = require("../../utils/app.util");
const { sendEmail } = require("../../utils/mail.util");
const { uploadFile } = require("../../utils/s3.util");
const { verifyToken } = require("../../utils/jwt.util");
const db = require("../../models");
const fs = require("fs");
const Replay = db.Replay;
const User = db.user;
const Profile = db.profile;

var bcrypt = require("bcryptjs");
const authConfig = require("../../configs/auth.config");
let referralCodeGenerator = require("referral-code-generator");

const Op = db.Sequelize.Op;

exports.replay = function (event, context) {
  let _replay = event.body;
  Profile.findOne({
    where: {
      profile_id: _replay.user_id,
    },
  }).then((user) => {
    let data = {
      Replay_profile_id: _replay.user_id,
      Replay_user_name: user.profile_first_name,
      Replay_user_image: user.profile_img,
      Replay_video_id: _replay.vedio_id,
      Replay_replay_id: _replay.replay_id,
      Replay_message: _replay.message,
    };
    Replay.create(data).then((profile) => {
      context.done(
        null,
        send_response(200, {
          status: 200,
          Message: "Successfully Added",
        })
      );
    });
  });
};

exports.updatemessage = function (event, context) {
  let _replay = event.body;
  verifyToken(event.headers)
    .then((auther) => {
      Replay.update(
        {
          Replay_message: _replay.message,
        },
        {
          where: {
            replay_id: event.pathParams.replay_id,
          },
        }
      )
        .then((profile) => {
          context.done(
            null,
            send_response(200, {
              status: 200,
              Message: "updated Successfully",
            })
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

  // Address.update(
  //   {
  //     user_id: _adress.user_id,
  //     address: _adress.address,
  //     latitude: _adress.latitude,
  //     longitude: _adress.longitude,
  //     address_label: _adress.address_label,
  //     land_mark: _adress.land_mark,
  //     delivery_note: _adress.delivery_note,
  //     door_no: _adress.door_no,
  //   },
  //   {
  //     where: {
  //       Address_id: event.pathParams.address_id,
  //     },
  //   }
  // )
  //   .then((profile) => {
  //     context.done(
  //       null,
  //       send_response(200, {
  //         Message: "updated Successfully",
  //       })
  //     );
  //   })
  //   .catch((err) => {
  //     context.done(null, send_response(500, { message: err.message }));
  //   });
};
exports.listReplay = function (event, context) {
  var _userId = event.pathParams.user_id;

  console.log("jjj", _userId);
  Replay.findOne({
    where: {
      Address_user_id: _userId,
    },
  })
    .then((addressList) => {
      context.done(null, send_response(200, addressList));
    })
    .catch((err) => {
      context.done(null, send_response(500, { message: err.message }));
    });
};
