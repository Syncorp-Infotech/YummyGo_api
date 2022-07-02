const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const { message, profile } = require('../../models');
const Message = db.message;
const Profile = db.profile;
exports.createMessage = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        Profile.findOne({
            where: {
                profile_id: _data.profile_id
            }
        }).then(user => {
            if (user) {
                Message.create({
                    profile_first_name: user.profile_first_name,
                    profile_last_name: user.profile_last_name,
                    profile_img: user.profile_img,
                    role_id: user.role_id,
                    profile_id: user.profile_id,
                    message: _data.message,

                }).then(category => {
                    context.done(null, send_response(200, category));
                }).catch(err => {
                    context.done(null, send_response(500, { message: err.message }));
                });
            } else {
                context.done(null, send_response(400, { message: 'Invalid user profile_id' }));
            }
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        console.log(err);
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}
exports.getMessageList = function (event, context) {
    verifyToken(event.headers).then(auther => {
        Message.findAndCountAll({
            where: { profile_id: event.body.profile_id }
        }).then(message => {
            context.done(null, send_response(200, message));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
    }).catch(err => {
        console.log(err);
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}
