const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const product_rating = db.product_rating;

exports.createproduct_rating = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        product_rating.create({
            pr_product_id: _data.pr_product_id,
            pr_merchant_id:  _data.pr_merchant_id,
            pr_user_id :  _data.pr_user_id,
            pr_user_name : _data.pr_user_name,
            pr_user_img : _data.pr_user_img,
            pr_order_id : _data.pr_order_id,
            pr_rating:  _data.pr_rating,
            pr_rating_date:  _data.pr_rating_date,
            pr_rating_text:  _data.pr_rating_text,
            pr_status:  _data.pr_status
        }).then(product_rating => {
            context.done(null, send_response(200, product_rating));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.getproduct_ratinglist = function (event, context) {
    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);
    var filter = {
        order: [['created_at', 'DESC']],
        offset: _offset,
        limit: _limit,
        where: { cat_status: "A" }
    };
    verifyToken(event.headers).then(auther => {
        product_rating.findAndCountAll(filter).then(product_rating => {
            context.done(null, send_response(200, product_rating));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.getproduct_rating = function (event, context) {
    verifyToken(event.headers).then(auther => {
        product_rating.findOne({
            where: { cat_id: event.pathParams.cat_id }
        }).then(product_rating => {
            context.done(null, send_response(200, product_rating));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.getproduct_ratinglist_by_profile = function (event, context) {
   console.log(event.pathParams.cat_id);
    var filter = {
        where: { pr_product_id: event.pathParams.pr_product_id,
            pr_merchant_id: event.pathParams.pr_merchant_id }
    };
        product_rating.findAndCountAll(filter).then(product_rating => {
            context.done(null, send_response(200, product_rating));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        }); 
}


exports.updateproduct_rating = function (event, context) {
    var _data = event.body;

    verifyToken(event.headers).then(auther => {
        product_rating.update({
            cat_name: _data.cat_name,
            cat_pid: _data.cat_pid,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(product_rating => {
            context.done(null, send_response(200, { message: 'product_rating updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.updateproduct_rating_status = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        product_rating.update({
            cat_status: _data.cat_status,
            cat_pid: _data.cat_pid,
            cat_reason : _data.cat_reason,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(product_rating => {
            context.done(null, send_response(200, { message: 'product_rating updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}


exports.deleteproduct_rating = function (event, context) {
    verifyToken(event.headers).then(auther => {
        product_rating.destroy({
            where: { cat_id: event.pathParams.cat_id }
        }).then(product_rating => {
            context.done(null, send_response(200, { message: 'product_rating deleted successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}