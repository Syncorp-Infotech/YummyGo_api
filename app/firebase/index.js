const db = require("../models");
const { admin } = require('./config');
const controller = require('../controllers/notification')
const User = db.user;

var sendFCM = function (_message) {
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    }

    User.findOne({
        where: {
            profile_id: _message.receiverChatID
        }
    }).then(user => {
        if (user != null) {
            const message = {
                notification: {
                    title: user.user_name,
                    body: _message.content,
                    sound: 'default'
                }
            };
            
            if (user.fcm_mtoken) {
                admin.messaging().sendToDevice(user.fcm_mtoken, message, options)
                .then(response => {
                    console.log("Notification sent successfully ", response)
                })
                .catch(error => {
                    console.log(error);
                });
            }
            if (user.fcm_wtoken) {
                admin.messaging().sendToDevice(user.fcm_wtoken, message, options)
                .then(response => {
                    console.log("Notification sent successfully ", response)
                })
                .catch(error => {
                    console.log(error);
                });
            }
        } else {
            console.log('Receiver not found');
        }
    }).catch(err => {
        console.log(err);
    });
}

var sendFCM_orderStatus = function (_order) {
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    }

    console.log(_order.order_status, ' ---- OS -------');
    var _status = '';
    if (_order.order_status == 'A') {
        _status = 'accepted'
    } else if (_order.order_status == 'C') {
        _status = 'rejected'
    } else if (_order.order_status == 'P') {
        _status = 'picked to delivery'
    } else if (_order.order_status == 'D') {
        _status = 'delivered'
    }

    const message = {
        notification: {
            title: 'Order Status',
            body: `Order # : ${_order.order_no} has ${_status}.`,
            sound: 'default'
        }
    };

    let note = {
        title: message.notification.title,
        content: message.notification.body
    }
    if (_order.order_status == 'D') {
        User.findOne({
            where: {
                profile_id: _order.merchant
            }
        }).then(user => {
            if (user != null) {
                note["profile_id"] = _order.merchant;
                controller.saveNotification(note);
                if (user.fcm_mtoken) {
                    admin.messaging().sendToDevice(user.fcm_mtoken, message, options)
                    .then(response => {
                        console.log("Notification to Device ", response)
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
                if (user.fcm_wtoken) {
                    admin.messaging().sendToDevice(user.fcm_wtoken, message, options)
                    .then(response => {
                        console.log("Notification to Web ", response)
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
            } else {
                console.log('User not found');
            }
        }).catch(err => {
            console.log(err);
        });
    }

    User.findOne({
        where: {
            profile_id: _order.customer
        }
    }).then(user => {
        if (user != null) {
            note["profile_id"] = _order.customer;
            controller.saveNotification(note);
            if (user.fcm_mtoken) {
                admin.messaging().sendToDevice(user.fcm_mtoken, message, options)
                .then(response => {
                    console.log("Notification to Device ", response)
                })
                .catch(error => {
                    console.log(error);
                });
            }
            if (user.fcm_wtoken) {
                admin.messaging().sendToDevice(user.fcm_wtoken, message, options)
                .then(response => {
                    console.log("Notification to Web ", response)
                })
                .catch(error => {
                    console.log(error);
                });
            }
        } else {
            console.log('User not found');
        }
    }).catch(err => {
        console.log(err);
    });
}

var sendFCM_orderCreate = function (_order) {
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    }

    const message = {
        notification: {
            title: 'New Order',
            body: `Order # : ${_order.order_no} placed successfully`,
            sound: 'default'
        }
    };

    let note = {
        title: message.notification.title,
        content: message.notification.body
    }
    User.findOne({
        where: {
            profile_id: _order.merchant
        }
    }).then(user => {
        if (user != null) {
            note["profile_id"] = _order.merchant;
            controller.saveNotification(note);
            if (user.fcm_mtoken) {
                admin.messaging().sendToDevice(user.fcm_mtoken, message, options)
                .then(response => {
                    console.log("Notification to Device ", response)
                })
                .catch(error => {
                    console.log(error);
                });
            }
            if (user.fcm_wtoken) {
                admin.messaging().sendToDevice(user.fcm_wtoken, message, options)
                .then(response => {
                    console.log("Notification to Web ", response)
                })
                .catch(error => {
                    console.log(error);
                });
            }
        } else {
            console.log('User not found');
        }
    }).catch(err => {
        console.log(err);
    });
}

var sendFCM_newVideo = function (_video) {
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    }

    const message = {
        notification: {
            title: 'New Video',
            body: `New video uploaded successfully`,
            sound: 'default'
        }
    };

    // let note = {
    //     title: message.notification.title,
    //     content: message.notification.body
    // }
    var query = "SELECT fcm_mtoken FROM user WHERE user_status = 'A' AND fcm_mtoken IS NOT NULL";

    db.sequelize.query(query, {
        raw: true,
        type: QueryTypes.SELECT,
    }).then(mtokens => {
        console.log('Device Tokens : ', mtokens);
        if (mtokens.length > 0) {
            mtokens.forEach((token, index, array) => {
                admin.messaging().sendToDevice(token, message, options)
                .then(response => {
                    console.log("Notification to Device ", response)
                })
                .catch(error => {
                    console.log(error);
                });
            });
        } else {
            console.log('No tokens');
        }
    }).catch(err => {
        console.log('Video FCM Error ::: ', err);
    });
}

exports.sendFCM = sendFCM;
exports.sendFCM_OS = sendFCM_orderStatus;
exports.sendFCM_OC = sendFCM_orderCreate;
exports.sendFCM_NV = sendFCM_newVideo;