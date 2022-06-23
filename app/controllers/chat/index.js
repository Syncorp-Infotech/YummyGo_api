const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const { sendFCM } = require('../../firebase')
const { QueryTypes, where } = require('sequelize');
const db = require("../../models");
const Chat = db.chat;

exports.saveMsg = function (message) {
    Chat.create({
        chat_sender: message.senderChatID,
        chat_receiver: message.receiverChatID,
        chat_content: message.content,
        chat_status: 'U' // message.status
    }).then(chat => {
        console.log('chat save successfully');
    }).catch(err => {
        console.log(err);
    })
}

exports.viewMsg = function (receiverChatID, senderChatID) {
    Chat.update({
        chat_status: 'R'
    }, {
        where: {
            chat_sender: receiverChatID,
            chat_receiver: senderChatID,
            chat_status: 'U'
        }
    }).then(chat => {
        console.log('chat viewed successfully');
    }).catch(err => {
        console.log(err);
    })
}

exports.markAsRead = function (event, context) {
    var _sender = event.pathParams.sender_id;
    var _receiver = event.pathParams.receiver_id;
    console.log(_sender,_receiver);
    Chat.update({
        chat_status: 'R'
    }, {
        where: {
            chat_sender: _receiver,
            chat_receiver: _sender,
            chat_status: 'U'
        }
    }).then(chat => {
        console.log('chat marked as read successfully',chat);
        context.done(null, send_response(200, { message: 'Messages marked as read'}));
    }).catch(err => {
        console.log(err);
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.saveAndSendMsg = function (event, context) {
    var message = event.body;
    console.log('message --- ', message);

    Chat.create({
        chat_sender: message.senderChatID,
        chat_receiver: message.receiverChatID,
        chat_content: message.content,
        chat_status: 'U' // message.status
    }).then(chat => {
        console.log('chat save successfully');

        sendFCM(message);

        context.done(null, send_response(200, chat));
    }).catch(err => {
        console.log(err);
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.saveAndSendMsg2 = function (event, context) {
    var message = event.body;
    console.log('message --- ', message);

    Chat.create({
        chat_sender: message.senderChatID,
        chat_receiver: message.receiverChatID,
        chat_content: message.content,
        chat_status: 'R' // message.status
    }).then(chat => {
        console.log('chat save successfully');

        sendFCM(message);

        context.done(null, send_response(200, chat));
    }).catch(err => {
        console.log(err);
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}





exports.msgsList = function (event, context) {

    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);
    var _sender = event.pathParams.sender_id;
    var _receiver = event.pathParams.receiver_id;

    db.sequelize.query("SELECT c.chat_content, c.chat_sender, c.chat_receiver, c.chat_status, c.created_at AS chated_on FROM chat c WHERE (c.chat_sender = $sender OR c.chat_sender = $receiver) AND (c.chat_receiver = $sender OR c.chat_receiver = $receiver) ORDER BY c.created_at", {
        bind: { sender: _sender, receiver: _receiver },
        raw: true,
        type: QueryTypes.SELECT,
    }).then(chats => {
        context.done(null, send_response(200, { count: chats.length, rows: chats }));
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    });
}