const auth = require("../../configs/auth.config");
const { send_response } = require("../../utils/app.util");
const db = require("../../models");
const User = db.user;
const Profile = db.profile;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

async function signin(event, context) {
  let _login = event.body;
  console.log("login>>>>>>>>>", _login.email);
  User.findOne({
    where: {
      user_login: _login.email,
    },
  })
    .then((user) => {
      console.log("user>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", user);
      if (!user) {
        console.log("passwordIsVakid>>>>>>>", passwordIsValid);
        var error = { status_code: "500", message: "Invalid account" };
        context.done(
          null,
          send_response(error.status_code ? error.status_code : 500, {
            message: error.message,
          })
        );
      } else if (user && user.user_status == "N") {
        console.log("passwordIsVakid01111", passwordIsValid);
        var error = { status_code: "500", message: "Account not activated" };
        context.done(
          null,
          send_response(error.status_code ? error.status_code : 500, {
            message: error.message,
          })
        );
      } else {
        console.log("passwordIsVakid>>>>>>>>>>>>>>>>>>>", passwordIsValid);
        var passwordIsValid = bcrypt.compareSync(
          _login.password,
          user.user_password || ""
        );
        console.log("passwordIsVakid", passwordIsValid);
        if (!passwordIsValid) {
          var error = { status_code: "500", message: "Invalid password" };
          context.done(
            null,
            send_response(error.status_code ? error.status_code : 500, {
              message: error.message,
            })
          );
        }

        var _token = jwt.sign({ id: user.user_id }, auth.secret, {
          expiresIn: "2 days", // 24 hours
        });

        Profile.findOne({
          where: {
            profile_id: user.profile_id,
          },
        }).then((profile) => {
          context.done(
            null,
            send_response(200, {
              user: {
                user_id: user.user_id,
                user_name: profile.profile_first_name,
                user_full_name:
                  profile.profile_first_name + " " + profile.profile_last_name,
                user_email: profile.profile_email,
                user_mobile: profile.profile_contact,
                profile_id: profile.profile_id,
                profile_img: profile.profile_img,
                business_name: profile.profile_biz_name,
                role_id: profile.role_id,
              },
              key: {
                token: _token,
              },
            })
          );
        });
      }
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 500, {
          message: err.message,
        })
      );
    });
}
exports.signin = signin;
