const { send_response, uniqueId } = require("../../utils/app.util");
const { sendEmail } = require("../../utils/mail.util");
const { uploadFile } = require("../../utils/s3.util");
const db = require("../../models");
const { verifyToken } = require("../../utils/jwt.util");
const fs = require("fs");
const userreferal = db.user_referral;
const Profile = db.profile;
const neworder = db.neworder;

var bcrypt = require("bcryptjs");
const authConfig = require("../../configs/auth.config");
let referralCodeGenerator = require("referral-code-generator");

const Op = db.Sequelize.Op;

exports.Myreferallist = function (event, context) {
  var _profileId = event.pathParams.profile_id;
  userreferal
    .findAll({
      where: {
        referred_user_id: _profileId,
      },
    })
    .then(async (value) => {
      referal_list = [];
      for (let index = 0; index < value.length; index++) {
        const element = value[index];
        console.log("element", element);
        await Profile.findAll({
          where: {
            profile_id: element.dataValues.user_id,
          },
        })
          .then(async (data) => {
            await referal_list.push(data);
          })
          .catch((err) => {
            context.done(null, send_response(500, { message: err.message }));
          });
      }
      context.done(null, send_response(200, referal_list));
    })
    .catch((err) => {
      context.done(null, send_response(500, { message: err.message }));
    });
};
exports.listorder = function async(event, context) {
  var _profileId = event.pathParams.profile_id;
  let amount = [];
  neworder
    .findAll({
      where: {
        order_customer_id: _profileId,
        order_status: "DELIVERED",
      },
    })
    .then(async (orderlist) => {
      for (let index = 0; index < orderlist.length; index++) {
        const element = orderlist[index];
        let referal = element.order_amount;
        let referalamount = 0.025 * referal;

        element.dataValues["referal_amount"] = referalamount;
        console.log("element", element.dataValues);
        amount.push(element.dataValues);
      }
      context.done(null, send_response(200, amount));
    })
    .catch((err) => {
      context.done(null, send_response(500, { message: err.message }));
    });
};
exports.updateAddress = function (event, context) {
  var _adress = event.body;
  Address.findAll({
    where: {
      user_id: _adress.user_id,
      address_label: _adress.address_label,
    },
  })
    .then((value) => {
      // if (value.length > 0) {
      //   context.done(
      //     null,
      //     send_response(200, {
      //       Message: "Please choose the different address name",
      //     })
      //   );
      // }
      verifyToken(event.headers)
        .then((auther) => {
          Address.update(
            {
              user_id: _adress.user_id,
              address: _adress.address,
              latitude: _adress.latitude,
              longitude: _adress.longitude,
              address_label: _adress.address_label,
              land_mark: _adress.land_mark,
              delivery_note: _adress.delivery_note,
              door_no: _adress.door_no,
            },
            {
              where: {
                Address_id: event.pathParams.address_id,
              },
            }
          )
            .then((profile) => {
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

exports.deleteAddress = function (event, context) {
  verifyToken(event.headers)
    .then(() => {
      Address.destroy({
        where: { Address_id: event.pathParams.Address_id },
      })
        .then((category) => {
          context.done(
            null,
            send_response(200, { message: "Address deleted successfully" })
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
