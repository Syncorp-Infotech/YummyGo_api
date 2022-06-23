const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const Notification = db.notification;

exports.saveNotification = function (note) {
    Notification.create({
        profile_id: note.profile_id,
        note_title : note.title,
        note_content: note.content,
        note_status: 'U'
    }).then(note => {
    }).catch(err => {
        console.log(err);
    })
}

exports.notificationsList = function (event, context) {
    var _profile = event.pathParams.profile_id;
        Notification.findAndCountAll({
            where: { profile_id: _profile }
        }).then(notes => {
            context.done(null, send_response(200, notes));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
}

exports.markAsRead = function (event, context) {
        Notification.update({
            note_status: 'R'
        }, {
            where: { profile_id: event.pathParams.profile_id }
        }).then(notes => {
            context.done(null, send_response(200, { message: 'Notification marked as read'}));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
}