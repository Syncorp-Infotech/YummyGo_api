const nodemailer = require("nodemailer");
const authconfig = require("../configs/auth.config");

let transport = nodemailer.createTransport({
  //service: "Godaddy",
  //Port: 465,
  //Authentication: "none",
  host: "mail.theyummygo.com",
  port: 587,
  Allow_less_secure_apps: "ON",
  auth: {
    user: "dev@theyummygo.com",
    pass: "foodie@2021",
  },
  tls: {
    rejectUnauthorized: false,
  },
  secure: false,
  //security: "ssl",
  //service: "gmail",
  // auth: {
  //   user: "developer",
  //   pass: "YUMMYGOprojec@2022",
  // },
});

exports.sendEmail = function (message) {
  console.log("hhhhhhhhhhhhhh");
  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
      console.log("err", err);
    } else {
      console.log(info);
      console.log("info", info);
    }
  });
};
