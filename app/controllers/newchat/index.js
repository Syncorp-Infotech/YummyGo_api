const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const newchat = db.newchat;

exports.createnewchat = function (event, context) {
    var _data = event.body;
        newchat.create({
chat_title : _data.chat_title,
chat_status : _data.chat_status,
chat_start_time : _data.chat_start_time,
chat_end_time : _data.chat_end_time,
chat_sender_id : _data.chat_sender_id,
chat_reciver_id : _data.chat_reciver_id,
chat_user_type : _data.chat_user_type,
chat_type : _data.chat_type,
chat_text : _data.chat_text,
chat_location : _data.chat_location,
chat_img : _data.chat_img,
chat_head : _data.chat_head,
chat_attend_by : _data.chat_attend_by,
chat_read_status : _data.chat_read_status,  
chat_name  : _data.chat_name,  
created_by :  _data.created_by, 
chat_user_id : _data.chat_user_id, 
chat_admin_id : _data.chat_admin_id, 
chat_merchant_id : _data.chat_merchant_id, 
chat_driver_id : _data.chat_driver_id, 
        }).then(newchat => {
            context.done(null, send_response(200, newchat));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}

exports.getcategorieslist = function (event, context) {
    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);
    var filter = {
        order: [['created_at', 'DESC']],
        offset: _offset,
        limit: _limit
    };
    verifyToken(event.headers).then(auther => {
        newchat.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.getnewchat = function (event, context) {
    verifyToken(event.headers).then(auther => {
        newchat.findOne({
            where: { cat_id: event.pathParams.cat_id }
        }).then(newchat => {
            context.done(null, send_response(200, newchat));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.getnewchatlist_by_profile = function (event, context) {
   console.log(event.pathParams.chat_reciver_id);
    var filter = {
        where: { chat_reciver_id: event.pathParams.chat_reciver_id }
    };
        newchat.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        }); 
}



exports.getnewchatlist_by_both = function (event, context) {
    console.log(event.pathParams.chat_reciver_id);
     var filter = {
         where: { chat_reciver_id: event.pathParams.chat_reciver_id,chat_sender_id: event.pathParams.chat_sender_id }
     };
         newchat.findAndCountAll(filter).then(categories => {
             context.done(null, send_response(200, categories));
         }).catch(err => {
             context.done(null, send_response(500, { message: err.message }));
         }); 
 }

 exports.getnewchatlist_by_chat_name = function (event, context) {
    console.log(event.pathParams.chat_name);
     var filter = {
         where: { chat_name: event.pathParams.chat_name}
     };
         newchat.findAndCountAll(filter).then(categories => {
             context.done(null, send_response(200, categories));
         }).catch(err => {
             context.done(null, send_response(500, { message: err.message }));
         }); 
 }


 exports.getnewchatlist_by_chat_reciver_id = function (event, context) {
    console.log(event.pathParams.chat_reciver_id);
    var filter = {
        include: [
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name','role_id','profile_img'],
                as: 'sender_info'
            },
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name','role_id','profile_img'],
                as: 'receiver_info'
            }
        ],
        where: { chat_user_id: event.pathParams.chat_reciver_id}
       }
         newchat.findAndCountAll(filter).then(categories => {
             context.done(null, send_response(200, categories));
         }).catch(err => {
             context.done(null, send_response(500, { message: err.message }));
         }); 
 }


 exports.getnewchatlist_by_chat_name_chatreadstatus = function (event, context) {
    var _data = event.body;
        newchat.update({
            chat_read_status: 'R',
        }, {
            where: {
                chat_reciver_id : event.pathParams.chat_reciver_id,
                chat_name: event.pathParams.chat_name,
                chat_read_status : 'U'
            }
        }).then(newchat => {
            context.done(null, send_response(200, { message: 'newchat updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}



exports.updatenewchat = function (event, context) {
    var _data = event.body;

    verifyToken(event.headers).then(auther => {
        newchat.update({
            cat_name: _data.cat_name,
            cat_pid: _data.cat_pid,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(newchat => {
            context.done(null, send_response(200, { message: 'newchat updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.updatenewchat_status = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        newchat.update({
            cat_status: _data.cat_status,
            cat_pid: _data.cat_pid,
            cat_reason : _data.cat_reason,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(newchat => {
            context.done(null, send_response(200, { message: 'newchat updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}


exports.deletenewchat = function (event, context) {
    verifyToken(event.headers).then(auther => {
        newchat.destroy({
            where: { cat_id: event.pathParams.cat_id }
        }).then(newchat => {
            context.done(null, send_response(200, { message: 'newchat deleted successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}