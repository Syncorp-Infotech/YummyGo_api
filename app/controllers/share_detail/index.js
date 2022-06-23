const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const share_detail = db.share_detail;

exports.createshare_detail = function (event, context) {
    var _data = event.body;
    console.log(_data);
        share_detail.findOne({
            where: { share_detail_user_id: _data.share_detail_user_id, share_detail_merchant_id : _data.share_detail_merchant_id,video_id : _data.video_id }
        }).then(share_details => {
        console.log(share_details); 
        if(share_details == null) {
            share_detail.create({
                video_id : _data.video_id,
                share_detail_user_id: _data.share_detail_user_id,
                share_detail_merchant_id : _data.share_detail_merchant_id,
                share_detail_status: 'A',
            }).then(share_details => {
                context.done(null, send_response(200, share_details));
            }).catch(err => {
                context.done(null, send_response(500, { message: err.message }));
            });
        } else {
            context.done(null, send_response(200, share_details));
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
        share_detail.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.getshare_detail = function (event, context) {
    verifyToken(event.headers).then(auther => {
        share_detail.findAndCountAll({
            where: { share_detail_user_id: event.pathParams.cat_id }
        }).then(share_detail => {
            context.done(null, send_response(200, share_detail));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.getshare_detail_count_status = function (event, context) {
    share_detail.findAndCountAll({where:{video_id : event.pathParams.video_id}}).then(like_detail => {
        let a = { over_all_count : like_detail.count , like_status : false}
        share_detail.findOne({
            where: { share_detail_user_id: event.pathParams.user_id, share_detail_merchant_id : event.pathParams.merchant_id , video_id : event.pathParams.video_id}
        }).then(like_details2 => {
            if(like_details2 == undefined || like_details2 == null){
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
        share_detail.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        }); 
}


exports.updateshare_detail = function (event, context) {
    var _data = event.body;

    verifyToken(event.headers).then(auther => {
        share_detail.update({
            cat_name: _data.cat_name,
            cat_pid: _data.cat_pid,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(share_detail => {
            context.done(null, send_response(200, { message: 'share_detail updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.updateshare_detail_status = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        share_detail.update({
            cat_status: _data.cat_status,
            cat_pid: _data.cat_pid,
            cat_reason : _data.cat_reason,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(share_detail => {
            context.done(null, send_response(200, { message: 'share_detail updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}


exports.deleteshare_detail = function (event, context) {
    verifyToken(event.headers).then(auther => {
        share_detail.destroy({
            where: { cat_id: event.pathParams.cat_id }
        }).then(share_detail => {
            context.done(null, send_response(200, { message: 'share_detail deleted successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}