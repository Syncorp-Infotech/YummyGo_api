const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const yummysaver = db.yummysaver;

exports.createyummysaver = function (event, context) {
    var _data = event.body;
    console.log(_data);
        yummysaver.create({
            yummysave_title : _data.yummysave_title,
            yummysave_desc : _data.yummysave_desc,
            yummysave_refer_status : _data.yummysave_refer_status,
            yummysave_refer_id : _data.yummysave_refer_id,
            yummysave_Benefits : _data.yummysave_Benefits,
            customer_id : _data.customer_id,
            merchant_id : _data.merchant_id,
            amount : _data.amount,
            yummysave_type : _data.yummysave_type,
            yummysave_refund_reason : _data.yummysave_refund_reason,
            yummysave_refund_date : _data.yummysave_refund_date,
            yummysave_amount : _data.yummysave_amount,
            yummysave_order_id : _data.yummysave_order_id,
            yummysave_order_amount : _data.yummysave_order_amount,
            yummysave_order_date : _data.yummysave_order_date,
            yummysave_order_refund_status : _data.yummysave_order_refund_status
        }).then(yummysaver => {
            context.done(null, send_response(200, yummysaver));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
 
}



exports.refunded_yummysaver = function (event, context) {
    var _data = event.body;
    console.log(_data);
    yummysaver.update({        
        yummysave_order_refund_status : 'Refunded',
    }, {
        where: {
            customer_id : _data.customer_id,
            yummysave_order_refund_status : 'Not Refund',
        }
    }).then(yummysaver => {
        context.done(null, send_response(200, { message: 'yummysaver updated successfully' }));
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
        yummysaver.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.getyummysaver = function (event, context) {
    verifyToken(event.headers).then(auther => {
        yummysaver.findOne({
            where: { customer_id: event.pathParams.user_id }
        }).then(yummysaver => {
            context.done(null, send_response(200, yummysaver));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.getcategorieslist_by_profile = function (event, context) {
   console.log(event.pathParams.customer_id);
    var filter = {
        where: { customer_id: event.pathParams.customer_id },
        order: [['created_at', 'DESC']],
    };
    yummysaver.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        }); 
}


exports.updateyummysaver = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        yummysaver.update({
            cat_name: _data.cat_name,
            cat_pid: _data.cat_pid,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(yummysaver => {
            context.done(null, send_response(200, { message: 'yummysaver updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.updateyummysaver_status = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        yummysaver.update({
            cat_status: _data.cat_status,
            cat_pid: _data.cat_pid,
            cat_reason : _data.cat_reason,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(yummysaver => {
            context.done(null, send_response(200, { message: 'yummysaver updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}


exports.deleteyummysaver = function (event, context) {
    verifyToken(event.headers).then(auther => {
        yummysaver.destroy({
            where: { cat_id: event.pathParams.cat_id }
        }).then(yummysaver => {
            context.done(null, send_response(200, { message: 'yummysaver deleted successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}