const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const Like_detail = db.like_detail;

exports.createlike_detail = function (event, context) {
    var _data = event.body;
    console.log(_data);
        Like_detail.findOne({
            where: { like_detail_user_id: _data.like_detail_user_id, like_detail_merchant_id : _data.like_detail_merchant_id ,video_id : _data.video_id}
        }).then(like_details => {
        console.log(like_details); 
        if(like_details == null) {
            Like_detail.create({
                video_id : _data.video_id,
                like_detail_user_id: _data.like_detail_user_id,
                like_detail_merchant_id : _data.like_detail_merchant_id,
                like_detail_status: 'A',
            }).then(like_details => {
                context.done(null, send_response(200, like_details));
            }).catch(err => {
                context.done(null, send_response(500, { message: err.message }));
            });
        } else {
            Like_detail.destroy({
                where: { like_detail_user_id: _data.like_detail_user_id, like_detail_merchant_id : _data.like_detail_merchant_id,video_id : _data.video_id }
            }).then(like_detail => {
                context.done(null, send_response(200, { message: 'like_detail deleted successfully' }));
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
        Like_detail.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.getlike_detail = function (event, context) {
    verifyToken(event.headers).then(auther => {
        Like_detail.findAndCountAll({
            where: { like_detail_user_id: event.pathParams.cat_id }
        }).then(like_detail => {
            context.done(null, send_response(200, like_detail));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}


// exports.getlike_detail_count_status = function (event, context) {
//          Like_detail.findAndCountAll().then(categories => {
//              context.done(null, send_response(200, categories));
//          }).catch(err => {
//              context.done(null, send_response(500, { message: err.message }));
//          }); 
//  }





exports.getlike_detail_count_status = function (event, context) {
        console.log("Like Count Details",{video_id : event.pathParams.video_id,like_detail_merchant_id : event.pathParams.merchant_id});
        Like_detail.findAndCountAll({where: {video_id : event.pathParams.video_id,like_detail_merchant_id : event.pathParams.merchant_id}}).then(like_detail => {
            let a = { over_all_count : like_detail.count , like_status : false}
            Like_detail.findOne({
                where: { like_detail_user_id: event.pathParams.user_id, like_detail_merchant_id : event.pathParams.merchant_id, video_id : event.pathParams.video_id}
            }).then(like_details2 => {
                console.log("00000000000000"+like_details2);
                if(like_details2 == null){
                  a.like_status = false;
                }else{
                   a.like_status = true;
                }
                context.done(null, send_response(200, a));
            }).catch(err => {
                context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
            })
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
}


exports.getcategorieslist_by_profile = function (event, context) {
   console.log(event.pathParams.cat_id);
    var filter = {
        where: { created_by: event.pathParams.cat_id }
    };
        Like_detail.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        }); 
}


exports.updatelike_detail = function (event, context) {
    var _data = event.body;

    verifyToken(event.headers).then(auther => {
        Like_detail.update({
            cat_name: _data.cat_name,
            cat_pid: _data.cat_pid,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(like_detail => {
            context.done(null, send_response(200, { message: 'like_detail updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.updatelike_detail_status = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        Like_detail.update({
            cat_status: _data.cat_status,
            cat_pid: _data.cat_pid,
            cat_reason : _data.cat_reason,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(like_detail => {
            context.done(null, send_response(200, { message: 'like_detail updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}


exports.deletelike_detail = function (event, context) {
    verifyToken(event.headers).then(auther => {
        Like_detail.destroy({
            where: { cat_id: event.pathParams.cat_id }
        }).then(like_detail => {
            context.done(null, send_response(200, { message: 'like_detail deleted successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}