const db = require("../models");
const User = db.user;

checkDuplicateMobileOrEmail = (req, res, next) => {
  // Usermobile
  User.findOne({
    where: {
      user_mobile: req.body.user_mobile
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Mobile number is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        user_email: req.body.user_email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateMobileOrEmail: checkDuplicateMobileOrEmail,
};

module.exports = verifySignUp;
