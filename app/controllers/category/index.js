const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const Category = db.category;

exports.createcategory = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        Category.create({
            cat_name: _data.cat_name,
            cat_pid: _data.cat_pid,
            cat_reason : '',
            cat_otp : '',
            cat_status: 'A',
            created_by: auther,
            updated_by: auther
        }).then(category => {
            context.done(null, send_response(200, category));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
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
        Category.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.getcategory = function (event, context) {
    verifyToken(event.headers).then(auther => {
        Category.findOne({
            where: { cat_id: event.pathParams.cat_id }
        }).then(category => {
            context.done(null, send_response(200, category));
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
        Category.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        }); 
}


exports.updatecategory = function (event, context) {
    var _data = event.body;

    verifyToken(event.headers).then(auther => {
        Category.update({
            cat_name: _data.cat_name,
            cat_pid: _data.cat_pid,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(category => {
            context.done(null, send_response(200, { message: 'Category updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.updatecategory_status = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        Category.update({
            cat_status: _data.cat_status,
            cat_pid: _data.cat_pid,
            cat_reason : _data.cat_reason,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(category => {
            context.done(null, send_response(200, { message: 'Category updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}


exports.deletecategory = function (event, context) {
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