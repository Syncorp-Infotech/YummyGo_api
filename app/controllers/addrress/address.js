const { send_response, uniqueId } = require("../../utils/app.util");
const { sendEmail } = require("../../utils/mail.util");
const { uploadFile } = require("../../utils/s3.util");
const db = require("../../models");
const { verifyToken } = require("../../utils/jwt.util");
const fs = require("fs");
const Address = db.Address;

var bcrypt = require("bcryptjs");
const authConfig = require("../../configs/auth.config");
let referralCodeGenerator = require("referral-code-generator");

const Op = db.Sequelize.Op;

exports.address = function (event, context) {
  let _adress = event.body;
  Address.findAll({
    where: {
      user_id: _adress.user_id,
      address_label: _adress.address_label,
    },
  }).then((value) => {
    // if (value.length > 0) {
    //   context.done(
    //     null,
    //     send_response(200, {
    //       Message: "Please choose the different address name",
    //     })
    //   );
    // }
    verifyToken(event.headers)
      .then(() => {
        let value = {
          user_id: _adress.user_id,
          address: _adress.address,
          latitude: _adress.latitude,
          longitude: _adress.longitude,
          address_label: _adress.address_label,
          land_mark: _adress.land_mark,
          delivery_note: _adress.delivery_note,
          door_no: _adress.door_no,
        };
        Address.create(value).then((profile) => {
          context.done(
            null,
            send_response(200, {
              Message: "Successfully Added",
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
  });
};
exports.listAddress = function (event, context) {
  var _userId = event.pathParams.user_id;
  verifyToken(event.headers)
    .then(() => {
      Address.findAll({
        where: {
          user_id: _userId,
        },
      })
        .then((addressList) => {
          context.done(null, send_response(200, addressList));
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
