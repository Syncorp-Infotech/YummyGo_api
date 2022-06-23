const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const follow_detail = db.follow_detail;

exports.createfollow_detail = function (event, context) {
    var _data = event.body;
    console.log(_data);
        follow_detail.findOne({
            where: { follow_detail_user_id: _data.follow_detail_user_id, follow_detail_merchant_id : _data.follow_detail_merchant_id,video_id : _data.video_id}
        }).then(follow_details => {
        console.log(follow_details); 
        if(follow_details == null) {
            follow_detail.create({
                video_id : _data.video_id,
                follow_detail_user_id: _data.follow_detail_user_id,
                follow_detail_merchant_id : _data.follow_detail_merchant_id,
                follow_detail_status: 'A',
            }).then(follow_details => {
                context.done(null, send_response(200, follow_details));
            }).catch(err => {
                context.done(null, send_response(500, { message: err.message }));
            });
        } else {
            follow_detail.destroy({
                where: { follow_detail_user_id: _data.follow_detail_user_id, follow_detail_merchant_id : _data.follow_detail_merchant_id,video_id : _data.video_id }
            }).then(follow_detail => {
                context.done(null, send_response(200, { message: 'follow_detail deleted successfully' }));
            }).catch(err => {
                context.done(null, send_response(500, { message: err.message }));
            });
        }
        }).catch(err => {
            console.log(err);
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        });
 
}

exports.getcategorieslist = function (event, context) {
    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);
    var filter = {
        order: [['created_at', 'DESC']],
        offset: _offset,
        limit: _limit,
        where: { cat_status: "A" }
    };
    verifyToken(event.headers).then(auther => {
        follow_detail.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.getfollow_detail = function (event, context) {
    verifyToken(event.headers).then(auther => {
        follow_detail.findAndCountAll({
            where: { follow_detail_user_id: event.pathParams.cat_id }
        }).then(follow_detail => {
            context.done(null, send_response(200, follow_detail));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}


exports.getfollow_detail_count_status = function (event, context) {
        let a = { over_all_count : 0, like_status : false}
        follow_detail.findOne({
            where: { follow_detail_user_id: event.pathParams.follow_detail_user_id, follow_detail_merchant_id : event.pathParams.follow_detail_merchant_id , video_id : event.pathParams.video_id}
        }).then(like_details2 => {
            console.log("1111111111",like_details2);
            if(like_details2 == null){
              a.like_status = false;
            }else{
               a.like_status = true;
            }
            context.done(null, send_response(200, a));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
}




exports.getcategorieslist_by_profile = function (event, context) {
   console.log(event.pathParams.cat_id);
    var filter = {
        where: { created_by: event.pathParams.cat_id }
    };
        follow_detail.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        }); 
}


exports.updatefollow_detail = function (event, context) {
    var _data = event.body;

    verifyToken(event.headers).then(auther => {
        follow_detail.update({
            cat_name: _data.cat_name,
            cat_pid: _data.cat_pid,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(follow_detail => {
            context.done(null, send_response(200, { message: 'follow_detail updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.updatefollow_detail_status = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        follow_detail.update({
            cat_status: _data.cat_status,
            cat_pid: _data.cat_pid,
            cat_reason : _data.cat_reason,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(follow_detail => {
            context.done(null, send_response(200, { message: 'follow_detail updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}


exports.deletefollow_detail = function (event, context) {
    verifyToken(event.headers).then(auther => {
        follow_detail.destroy({
            where: { cat_id: event.pathParams.cat_id }
        }).then(follow_detail => {
            context.done(null, send_response(200, { message: 'follow_detail deleted successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}