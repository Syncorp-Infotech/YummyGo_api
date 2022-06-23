const { send_response, uniqueId } = require("../../utils/app.util");
const { sendEmail } = require("../../utils/mail.util");
const { uploadFile } = require("../../utils/s3.util");
const db = require("../../models");
const fs = require("fs");
const User = db.user;
const Profile = db.profile;
const UserReferral = db.user_referral;

var bcrypt = require("bcryptjs");
const authConfig = require("../../configs/auth.config");
let referralCodeGenerator = require("referral-code-generator");

const Op = db.Sequelize.Op;

exports.signup = function (event, context) {
  let _signup = event.body;
  User.destroy({
    where: { user_login: _signup.email, user_status: "N" },
  })
    .then((category) => {
      User.findAll({
        where: {
          user_login: _signup.email,
          user_status: "A",
        },
      })
        .then((exprofile) => {
          if (exprofile.length > 0) {
            var error = {
              status_code: "500",
              message: "Email already registered with us",
            };
            throw error;
          } else {
            //create profile

            Profile.create({
              profile_first_name: _signup.first_name,
              profile_last_name: _signup.last_name,
              profile_email: _signup.email,
              profile_contact: _signup.contactno,
              role_id: _signup.role,
              biz_id: 1,
              profile_status: "A",
              rating: 5,
            })
              .then((profile) => {
                //referral code generator
                var referralCode = referralCodeGenerator.alphaNumeric(
                  "uppercase",
                  8,
                  7
                );
                console.log("refeerakcode", referralCode);
                var _otp = uniqueId(4);
                User.create({
                  profile_id: profile.dataValues.profile_id,
                  user_login: _signup.email,
                  user_password: bcrypt.hashSync(_signup.password, 8),
                  user_otp: _otp,
                  user_status: "N",
                  referral_code: referralCode,
                }).then((user) => {
                  var _response = {
                    profile_id: profile.dataValues.profile_id,
                    user_id: user.dataValues.user_id,
                  };

                  var _msghtml = fs.readFileSync(
                    "./app/templates/emailverificationotp.html",
                    "utf8"
                  );
                  const message = {
                    from: authConfig.smtp.sender,
                    to: user.user_login,
                    subject: "Foodie Email Verification",
                    html: _msghtml
                      .replace("@FoodieUser", profile.profile_first_name)
                      .replace("@Email", user.user_login)
                      .replace("@CODEHERE", _otp),
                  };
                  sendEmail(message);

                  //add refferal
                  if (_signup.referral_code) {
                    //get reffered user profile
                    User.findOne({
                      where: { referral_code: _signup.referral_code },
                    }).then((refferalProfile) => {
                      console.log("refferalProfile>>>>>>>", refferalProfile);
                      //create profile
                      UserReferral.create({
                        user_id: user.dataValues.user_id,
                        referred_user_id: refferalProfile.dataValues.user_id,
                        created_by: user.dataValues.user_id,
                      }).then((userReferral) => {
                        console.log("Refferal updated!");
                      });
                    });
                  }

                  context.done(null, send_response(200, _response));
                });
              })
              .catch((err) => {
                console.log(err);
                var error = { status_code: "500", message: err.message };
                throw error;
              });
          }
          // if (exprofile.length > 0) {
          //   var error = {
          //     status_code: "500",
          //     message: "Email already registered with us",
          //   };
          //   throw error;
          // }
          // else {
          //   //create profile

          //   Profile.create({
          //     profile_first_name: _signup.first_name,
          //     profile_last_name: _signup.last_name,
          //     profile_email: _signup.email,
          //     profile_contact: _signup.contactno,
          //     role_id: _signup.role,
          //     biz_id: 1,
          //     profile_status: "A",
          //     rating: 5,
          //   })
          //     .then((profile) => {
          //       console.log("profile", profile);
          //       //referral code generator
          //       var referralCode = referralCodeGenerator.alphaNumeric(
          //         "uppercase",
          //         8,
          //         7
          //       );
          //       console.log("refeerakcode", referralCode);
          //       var _otp = uniqueId(4);
          //       User.create({
          //         profile_id: profile.dataValues.profile_id,
          //         user_login: _signup.email,
          //         user_password: bcrypt.hashSync(_signup.password, 8),
          //         user_otp: _otp,
          //         user_status: "N",
          //         referral_code: referralCode,
          //       }).then((user) => {
          //         console.log("user", user);
          //         var _response = {
          //           profile_id: profile.dataValues.profile_id,
          //           user_id: user.dataValues.user_id,
          //         };

          //         var _msghtml = fs.readFileSync(
          //           "./app/templates/emailverificationotp.html",
          //           "utf8"
          //         );
          //         const message = {
          //           from: authConfig.smtp.sender,
          //           to: user.user_login,
          //           subject: "Foodie Email Verification",
          //           html: _msghtml
          //             .replace("@FoodieUser", profile.profile_first_name)
          //             .replace("@Email", user.user_login)
          //             .replace("@CODEHERE", _otp),
          //         };
          //         sendEmail(message);

          //         //add refferal
          //         if (_signup.referral_code) {
          //           //get reffered user profile
          //           User.findOne({
          //             where: { referral_code: _signup.referral_code },
          //           }).then((refferalProfile) => {
          //             console.log("refferalProfile", refferalProfile);
          //             //create profile
          //             UserReferral.create({
          //               user_id: user.dataValues.user_id,
          //               referred_user_id: refferalProfile.dataValues.user_id,
          //               created_by: user.dataValues.user_id,
          //             }).then((userReferral) => {
          //               console.log("Refferal updated!");
          //             });
          //           });
          //         }

          //         context.done(null, send_response(200, _response));
          //       });
          //     })
          //     .catch((err) => {
          //       console.log(err);
          //       var error = { status_code: "500", message: err.message };
          //       throw error;
          //     });
          // }
        })
        .catch((err) => {
          console.log("surya>>>>>");
          context.done(
            null,
            send_response(err.status_code ? err.status_code : 500, {
              message: err.message,
            })
          );
        });

      // context.done(null, send_response(200, { message: 'Category deleted successfully' }));
    })
    .catch((err) => {
      context.done(null, send_response(500, { message: err.message }));
    });
};

exports.ridersignup = function (event, context) {
  let _signup = event.body;
  User.destroy({
    where: { user_login: _signup.email, user_status: "N" },
  })
    .then((category) => {
      User.findOne({
        where: {
          user_login: _signup.email,
          user_status: "A",
        },
      })
        .then((exprofile) => {
          if (exprofile) {
            var error = {
              status_code: "500",
              message: "Email already registered with us",
            };
            throw error;
          } else {
            Profile.create({
              profile_biz_name: _signup.profile_biz_name,
              profile_email: _signup.profile_email,
              profile_contact: _signup.profile_contact,
              profile_gender: _signup.profile_gender,
              profile_address: _signup.profile_address,
              vehicle_no: _signup.vehicle_no,
              vehicle_type: _signup.vehicle_type,
              profile_first_name: _signup.profile_first_name,
              bank_name: _signup.bank_name,
              bank_acc_no: _signup.bank_acc_no,
              bank_ifsc_no: _signup.bank_ifsc_no,
              bank_branch: _signup.bank_branch,
              role_id: _signup.role,
              biz_id: 1,
              profile_status: "A",
              rating: 5,
            })
              .then((profile) => {
                var _otp = uniqueId(4);
                User.create({
                  profile_id: profile.dataValues.profile_id,
                  user_login: _signup.email,
                  user_password: bcrypt.hashSync(_signup.password, 8),
                  user_otp: _otp,
                  user_status: "N",
                }).then((user) => {
                  var _response = {
                    profile_id: profile.dataValues.profile_id,
                    user_id: user.dataValues.user_id,
                  };

                  var _msghtml = fs.readFileSync(
                    "./app/templates/emailverificationotp.html",
                    "utf8"
                  );
                  const message = {
                    from: authConfig.smtp.sender,
                    to: user.user_login,
                    subject: "Foodie Email Verification",
                    html: _msghtml
                      .replace("@FoodieUser", profile.profile_first_name)
                      .replace("@Email", user.user_login)
                      .replace("@CODEHERE", _otp),
                  };
                  sendEmail(message);

                  context.done(null, send_response(200, _response));
                });
              })
              .catch((err) => {
                var error = { status_code: "500", message: err.message };
                throw error;
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

      // context.done(null, send_response(200, { message: 'Category deleted successfully' }));
    })
    .catch((err) => {
      context.done(null, send_response(500, { message: err.message }));
    });
};

exports.verification_fb_token = function (event, context) {
  let _login = event.body;
  User.findOne({
    where: {
      user_id: _login.user_id,
    },
  })
    .then((user) => {
      user.update({
        fb_token: _login.fb_token,
      });
      var _response = {};
      context.done(null, send_response(200, _response));
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 500, {
          message: err.message,
        })
      );
    });
};

exports.verification = function (event, context) {
  let _login = event.body;

  User.findOne({
    where: {
      user_id: _login.user_id,
    },
  })
    .then((user) => {
      if (!user) {
        var error = { status_code: "404", message: "User not found" };
        throw error;
      }

      if (user.user_otp !== _login.otp) {
        var error = {
          status_code: "400",
          message: "OTP you entered is invalid.",
        };
        throw error;
      }

      user.update({
        user_status: "A",
        user_otp: null,
      });

      var _response = {
        profile_id: user.profile_id,
        user_id: user.user_id,
      };
      context.done(null, send_response(200, _response));
    })
    .catch((err) => {
      context.done(
        null,
        send_response(err.status_code ? err.status_code : 500, {
          message: err.message,
        })
      );
    });
};

exports.register = function (event, context) {
  var _data = event.body;
  console.log("Testing");
  // const file = event.files.menucard;

  // uploadFile(file, 'menucards').then((fileurl) => {
  Profile.update(
    {
      profile_biz_name: _data.profile_biz_name,
      business_proof_type: _data.business_proof_type,
      profile_biz_type: _data.profile_biz_type,
      profile_biz_avg_meal_cost: _data.profile_meal_cost,
      profile_address: _data.profile_address,
      profile_location: _data.profile_address,
      address_postal: _data.address_postal,
      city: _data.city,
      state: _data.state,
      postal: _data.postal,
      country: _data.country,
      address_landmark: _data.address_landmark,
      ref_email: _data.ref_email,
      cuisine: _data.cuisine,
      categorys: _data.categorys,
      location_lat: _data.location_lat,
      location_lng: _data.location_lng,
      profile_doc_menu: "",
      bank_acc_no: "00000000000000",
      bank_name: "Bank Name",
      bank_ifsc_no: "FOD000000001",
      bank_branch: "Branch Name",
      profile_first_name: _data.profile_first_name,
      profile_last_name: _data.profile_last_name,
      p_country_name: _data.p_country_name,
      p_state_name: _data.p_state_name,
      p_city_name: _data.p_city_name,
    },
    {
      where: {
        profile_id: _data.profile_id,
      },
    }
  )
    .then((profile) => {
      console.log(profile);
      context.done(
        null,
        send_response(200, { message: "Profile registered successfully" })
      );
    })
    .catch((err) => {
      console.log(err);
      context.done(null, send_response(500, { message: err.message }));
    });
  // }).catch(err => {
  //     context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
  // })
};

exports.register_profile = function (event, context) {
  var _data = event.body;
  console.log("Testing");
  // const file = event.files.menucard;

  // uploadFile(file, 'menucards').then((fileurl) => {
  Profile.update(
    {
      profile_first_name: _data.profile_first_name,
      profile_last_name: _data.profile_last_name,
    },
    {
      where: {
        profile_id: _data.profile_id,
      },
    }
  )
    .then((profile) => {
      context.done(
        null,
        send_response(200, { message: "Profile registered successfully" })
      );
    })
    .catch((err) => {
      console.log(err);
      context.done(null, send_response(500, { message: err.message }));
    });
  // }).catch(err => {
  //     context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
  // })
};

exports.register_summary = function (event, context) {
  var _data = event.body;
  console.log("Testing1", _data);
  // const file = event.files.menucard;

  // uploadFile(file, 'menucards').then((fileurl) => {
  Profile.update(
    {
      profile_summary: _data.profile_summary,
    },
    {
      where: {
        profile_id: _data.profile_id,
      },
    }
  )
    .then((profile) => {
      context.done(
        null,
        send_response(200, { message: "Profile registered successfully" })
      );
    })
    .catch((err) => {
      console.log(err);
      context.done(null, send_response(500, { message: err.message }));
    });
  // }).catch(err => {
  //     context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
  // })
};

exports.register_bank = function (event, context) {
  var _data = event.body;
  console.log("Testing");
  // const file = event.files.menucard;
  // uploadFile(file, 'menucards').then((fileurl) => {
  Profile.update(
    {
      bank_acc_no: _data.bank_acc_no,
      bank_name: _data.bank_name,
      bank_ifsc_no: _data.bank_ifsc_no,
      bank_branch: _data.bank_branch,
    },
    {
      where: {
        profile_id: _data.profile_id,
      },
    }
  )
    .then((profile) => {
      context.done(
        null,
        send_response(200, { message: "Profile registered successfully" })
      );
    })
    .catch((err) => {
      console.log(err);
      context.done(null, send_response(500, { message: err.message }));
    });
  // }).catch(err => {
  //     context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
  // })
};
