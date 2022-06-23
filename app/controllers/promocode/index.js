const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const Category = db.promocode;

exports.createpromocode = function (event, context) {
    var _data = event.body;
        Category.create({
            merchant_id : _data.merchant_id,
            promocode_type : _data.promocode_type,
            promocode_value :_data.promocode_value,
            promocode_mini_value :_data.promocode_mini_value,
            promocode_until : _data.promocode_until,
            promocode_usage : _data.promocode_usage,
            promocode_img : _data.promocode_img,
            promocode_status : "Active",
            created_by: 1,
            updated_by: 1
        }).then(category => {
            context.done(null, send_response(200, category));
        }).catch(err => {
            console.log(err);
            context.done(null, send_response(500, { message: err.message }));
        });
    
}

exports.getpromocodelist = function (event, context) {
    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);
    var filter = {
        order: [['created_at', 'DESC']],
        offset: _offset
    };
        Category.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}

exports.getpromocode = function (event, context) {
        Category.findAndCountAll({
            where: { merchant_id: event.pathParams.cat_id }
        }).then(category => {
            context.done(null, send_response(200, category));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
}



exports.getpromocode_available_user = function (event, context) {
    Category.findAndCountAll({
        include: [
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name'],
                as: 'merchant_info'
            },
        ],
        where: {promocode_status:"Active"},
        order: [['promocode_mini_value', 'ASC']],
    }).then(category => {
        context.done(null, send_response(200, category));
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.getpromocode_available = function (event, context) {
    Category.findAndCountAll({
        where: { merchant_id: event.pathParams.cat_id,promocode_status : "Active" },
        order: [['promocode_mini_value', 'ASC']],
    }).then(category => {
        context.done(null, send_response(200, category));
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.updatepromocode = function (event, context) {
    var _data = event.body;
        Category.update({
            cat_name: _data.cat_name,
            cat_pid: _data.cat_pid,
            updated_by: auther
        }, {
            where: {
                promocode_id: event.pathParams.promocode_id
            }
        }).then(category => {
            context.done(null, send_response(200, { message: 'Category updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}


exports.updatepromocode_status = function (event, context) {
    var _data = event.body;
        Category.update({
            promocode_status : _data.promocode_status,
        }, {
            where: {
                promocode_id: event.pathParams.promocode_id
            }
        }).then(category => {
            context.done(null, send_response(200, { message: 'Updated Successfully'}));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}


exports.updatepromocode_date = function (event, context) {
    var _data = event.body;
        Category.update({
            promocode_status : "Exp"
        }, {
            where: {
                promocode_id: event.pathParams.promocode_id
            }
        }).then(category => {
            context.done(null, send_response(200, { message: 'Category updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}




exports.deletepromocode = function (event, context) {
    verifyToken(event.headers).then(auther => {
        Category.destroy({
            where: { cat_id: event.pathParams.cat_id }
        }).then(category => {
            context.done(null, send_response(200, { message: 'Category deleted successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}