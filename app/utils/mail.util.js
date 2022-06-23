const nodemailer = require("nodemailer");
const authconfig = require("../configs/auth.config");

let transport = nodemailer.createTransport({
  // service: 'Godaddy',
  Port: 587,
  //Authentication: "none",
  Allow_less_secure_apps: "ON",
  auth: {
    user: authconfig.smtp.sender,
    pass: authconfig.smtp.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
  security: "ssl",
  service: "gmail",
  // auth: {
  //   user: "developer",
  //   pass: "YUMMYGOprojec@2022",
  // },
});

exports.sendEmail = function (message) {
  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
