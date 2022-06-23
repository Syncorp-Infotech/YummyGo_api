const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const { Sequelize, QueryTypes } = require('sequelize');
const db = require("../../models");
const User = db.user;
const Role = db.role;
const Profile = db.profile;
var GeoPoint = require('geopoint');

exports.updateMobileToken = function (event, context) {
    verifyToken(event.headers).then(auther => {
        User.update({
            fcm_mtoken: event.body.fcmToken,
            updated_by: auther
        }, {
            where: {
                user_id: event.pathParams.user_id
            }
        }).then(user => {
            context.done(null, send_response(200, { message: 'Token updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.updateWebToken = function (event, context) {
    verifyToken(event.headers).then(auther => {
        User.update({
            fcm_wtoken: event.body.fcmToken,
            updated_by: auther
        }, {
            where: {
                user_id: event.pathParams.user_id
            }
        }).then(user => {
            context.done(null, send_response(200, { message: 'Token updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.userDetail = function (event, context) {

    verifyToken(event.headers).then(auther => {
        User.findOne({
            where: {
                user_id: event.pathParams.user_id
            }
        }).then(user => {
            context.done(null, send_response(200, user));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.listUsers = function (event, context) {
        var _roleId = event.body.role;
        Profile.findAndCountAll({
            where: {
                role_id: _roleId
            },
            order: [['profile_first_name']]
        }).then(users => {
            context.done(null, send_response(200, users));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}


exports.merchantslist = function (event, context) {
    var _data = event.body;
    console.log(_data);
    var _roleId = event.body.role;
    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);
    var _filter = {
        include: [{
            model: Role,
            attributes: ['role_id', 'role_name']
        }, {
            model: User,
            attributes: ['user_id', 'user_login']
        }],
        where: {
            role_id: _roleId
        },
        order: [['profile_first_name']],
        offset: _offset,
        limit: _limit
    };

    if (_data.profile_id) {
        console.log('profile query in');
        _filter = {
            include: [{
                model: Role,
                attributes: ['role_id', 'role_name']
            }, {
                model: User,
                attributes: ['user_id', 'user_login']
            }, {
                model: db.favourite,
                attributes: ['id', 'customer'],
                where: {
                    customer: _data.profile_id
                },
                required: false
            }],
            where: {
                role_id: _roleId
            },
            order: [['profile_first_name']],
            offset: _offset,
            limit: _limit
        };
    }

    console.log(_filter);
    Profile.findAndCountAll(_filter).then(profiles => {
        var source = new GeoPoint(_data.lat, _data.lng);
        var merchants = { count: 0, rows: [] };
        profiles.rows.forEach(profile => {
            if (profile.location_lat && profile.location_lng) {
                var destination = new GeoPoint(profile.location_lat, profile.location_lng);
                var distance = source.distanceTo(destination, true)//output in kilometers

                let kms = Number(distance).toFixed(2); // Math.floor(distance);

                console.log(kms, ' - ', distance);
                if (kms < 20) {
                    profile.dataValues["distance"] = kms;
                    merchants.count = merchants.count + 1;
                    merchants.rows.push(profile);
                }
            }
        });
        context.done(null, send_response(200, merchants));
    }).catch(err => {
        context.done(null, send_response(500, { message: err.message }));
    });
}

exports.userChatsList = function (event, context) {

    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);
    var _user = event.pathParams.user_id;

    // "SELECT u.user_id, u.user_name, u.user_mobile, u.user_email, u.profile_id, r.role_name FROM user u INNER JOIN role r ON r.role_id = u.role_id WHERE u.user_status = 'A' AND u.user_id <> $userid ORDER BY u.user_name "
    db.sequelize.query("SELECT *, (CASE unseen_count WHEN 0 THEN FALSE ELSE TRUE END) AS has_un_seen_msgs, (CASE unseen_count WHEN 0 THEN TRUE ELSE FALSE END) AS seen FROM (SELECT p.profile_id, p.profile_first_name, p.profile_last_name, p.profile_contact, p.profile_email, p.profile_img, r.role_name, ctl.last_msg_time, (SELECT c.chat_content FROM chat c WHERE (c.chat_sender = p.profile_id OR c.chat_sender = $userid) AND (c.chat_receiver = $userid OR c.chat_receiver = p.profile_id) AND c.created_at = ctl.last_msg_time) AS last_msg, (SELECT count(*) AS unreadmsg FROM chat c WHERE (c.chat_sender = p.profile_id OR c.chat_sender = $userid) AND (c.chat_receiver = $userid OR c.chat_receiver = p.profile_id) AND c.chat_status = 'U') AS unseen_count FROM (SELECT cs.chat_sender, cs.chat_receiver, cs.chater, max(cs.created_at) AS last_msg_time FROM ((SELECT c.chat_sender, c.chat_receiver, c.chat_receiver AS chater, c.created_at FROM chat c WHERE c.chat_sender = $userid ORDER BY c.created_at DESC) UNION (SELECT c.chat_sender, c.chat_receiver, c.chat_sender AS chater, c.created_at FROM chat c WHERE c.chat_receiver = $userid ORDER BY c.created_at DESC)) AS cs GROUP BY cs.chater) AS ctl INNER JOIN profile p ON p.profile_id = ctl.chater INNER JOIN role r ON r.role_id = p.role_id ORDER BY ctl.last_msg_time DESC) AS lst", {
        bind: { userid: _user },
        raw: true,
        type: QueryTypes.SELECT,
    }).then(users => {
        context.done(null, send_response(200, { count: users.length, rows: users }));
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    });
}


exports.fetch_referel_code = function (event, context) {
        User.findOne({
            where: {
                user_id: event.pathParams.user_id
            }
        }).then(user => {
            context.done(null, send_response(200, user));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}



