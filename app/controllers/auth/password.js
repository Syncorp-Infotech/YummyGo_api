const auth = require("../../configs/auth.config");
const { send_response, uniqueId } = require('../../utils/app.util');
const { sendEmail } = require('../../utils/mail.util');
const authConfig = require("../../configs/auth.config");
const db = require("../../models");
const fs = require('fs');
const User = db.user;
const Profile = db.profile;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const Op = db.Sequelize.Op;

exports.forgetpassword = function (event, context) {
    let _data = event.body;
    User.findOne({
        where: {
            user_login: _data.email
        }
    }).then(user => {
        if (user) {
            var otp = uniqueId(4);
            user.update({
                user_otp: otp
            });
            var _msghtml = fs.readFileSync('./app/templates/forgetpasswordotp.html', 'utf8');
            const message = {
                from: authConfig.smtp.sender,
                to: user.user_login,
                subject: 'Foodie Password Reset OTP',
                html: _msghtml.replace("@FoodieUser", 'Foodie').replace("@Email", user.user_login).replace("@CODEHERE", otp)
            };
            sendEmail(message);

            context.done(null, send_response(200, { user_id: user.user_id, message: 'OTP sent to registered Email' }));
        } else {
            var error = { status_code: '500', message: 'Email not registered with us' };
            throw error;
        }
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 500, { message: err.message }));
    });
}

exports.passwordVerification = function (event, context) {
    let _data = event.body;

    User.findOne({
        where: {
            user_id: _data.user_id
        }
    })
        .then(user => {
            if (!user) {
                var error = { status_code: '404', message: 'User not found' };
                throw error;
            }

            if (user.user_otp !== _data.otp) {
                var error = { status_code: '400', message: 'OTP you entered is invalid.' };
                throw error;
            }

            user.update({
                user_otp: null
            });

            context.done(null, send_response(200, {
                user_id: user.user_id,
                profile_id: user.profile_id
            }));
        })
        .catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 500, { message: err.message }));
        });
}

exports.resetpassword = function (event, context) {
    let _data = event.body;

    User.findOne({
        where: {
            user_id: _data.user_id
        }
    })
        .then(user => {
            if (!user) {
                var error = { status_code: '404', message: 'User not found' };
                throw error;
            }

            user.update({
                user_password: bcrypt.hashSync(_data.password, 8),
            });

            var token = jwt.sign({ id: user.user_id }, auth.secret, {
                expiresIn: 86400 // 24 hours
            });

            Profile.findOne({
                where: {
                    profile_id: user.profile_id
                }
            }).then(profile => {
                context.done(null, send_response(200, {
                    user: {
                        user_id: user.user_id,
                        user_name: profile.profile_first_name + ' ' + profile.profile_last_name,
                        user_email: profile.profile_email,
                        user_mobile: profile.profile_contact,
                        profile_id: profile.profile_id,
                        role_id: profile.role_id
                    },
                    key: {
                        accessToken: token
                    }
                }));
            });

        })
        .catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 500, { message: err.message }));
        });
}

exports.resendotp = function (event, context) {
    let _data = event.body;
    User.findOne({
        where: {
            user_login: _data.email
        }
    }).then(user => {
        if (user) {
            var otp = uniqueId(4);
            user.update({
                user_otp: otp,
                user_status: 'A',
            });
            if (_data.type == 'verifyemail') {
                var _msghtml = fs.readFileSync('./app/templates/emailverificationotp.html', 'utf8');
                const message = {
                    from: authConfig.smtp.sender,
                    to: user.user_login,
                    subject: 'Foodie Email Verification',
                    html: _msghtml.replace("@FoodieUser", 'Foodie').replace("@Email", user.user_login).replace("@CODEHERE", otp)
                };
                sendEmail(message);
            } else {
                var _msghtml = fs.readFileSync('./app/templates/forgetpasswordotp.html', 'utf8');
                const message = {
                    from: authConfig.smtp.sender,
                    to: user.user_login,
                    subject: 'Foodie Password Reset OTP',
                    html: _msghtml.replace("@FoodieUser", 'Foodie').replace("@Email", user.user_login).replace("@CODEHERE", otp)
                };
                sendEmail(message);
            }
            context.done(null, send_response(200, { message: 'OTP sent to your registered Email' }));
        } else {
            var error = { status_code: '500', message: 'Email not registered' };
            throw error;
        }
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 500, { message: err.message }));
    });
}


exports.email_checks = function (event, context) {
    let _data = event.body;
    User.findOne({
        where: {
            user_login: _data.email,
            user_status : "A"
        }
    }).then(user => {
        if (user) {
            Profile.findOne({
                where: {
                    profile_email: _data.email
                }
            }).then(profile => {
                if (user) {
                    context.done(null, send_response(200, { message: 'Email already registered',profile : profile }));
                } else {
                    var error = { status_code: '500', message: 'Email not registered' };
                    throw error;
                }
            }).catch(err => {
                context.done(null, send_response(err.status_code ? err.status_code : 500, { message: err.message }));
            });
            // context.done(null, send_response(200, { message: 'Email already registered',user : user }));
        } else {
            var error = { status_code: '500', message: 'Email not registered' };
            throw error;
        }
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 500, { message: err.message }));
    });
}
