const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const Transcation = db.transcation;

exports.createtranscation = function (event, context) {
    var _data = event.body;
        Transcation.create({
            trans_name : _data.trans_name,
            trans_img : _data.trans_img,
            trans_desc : _data.trans_desc,
            trans_type : _data.trans_type,
            trans_date : _data.trans_date,
            customer_id : _data.customer_id,
            amount: _data.amount,
            merchant_id : _data.merchant_id,
            order_id : _data.order_id,
            // created_by: auther,
            // updated_by: auther
        }).then(transcation => {
            context.done(null, send_response(200, transcation));
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
        Transcation.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.gettranscation = function (event, context) {
    verifyToken(event.headers).then(auther => {
        Transcation.findOne({
            where: { cat_id: event.pathParams.cat_id }
        }).then(transcation => {
            context.done(null, send_response(200, transcation));
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
        where: { customer_id: event.pathParams.cat_id }
    };
    Transcation.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        }); 
}


exports.updatetranscation = function (event, context) {
    var _data = event.body;

    verifyToken(event.headers).then(auther => {
        Transcation.update({
            cat_name: _data.cat_name,
            cat_pid: _data.cat_pid,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(transcation => {
            context.done(null, send_response(200, { message: 'transcation updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.updatetranscation_status = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        Transcation.update({
            cat_status: _data.cat_status,
            cat_pid: _data.cat_pid,
            cat_reason : _data.cat_reason,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(transcation => {
            context.done(null, send_response(200, { message: 'transcation updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}


exports.deletetranscation = function (event, context) {
    verifyToken(event.headers).then(auther => {
        Transcation.destroy({
            where: { cat_id: event.pathParams.cat_id }
        }).then(transcation => {
            context.done(null, send_response(200, { message: 'transcation deleted successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}