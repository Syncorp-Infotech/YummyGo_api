const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const Category = db.city;

exports.createcategory = function (event, context) {
    var _data = event.body;
        Category.create({
            city_name: _data.city_name,
            state_name: _data.state_name,
            created_by: 1,
            updated_by: 1
        }).then(category => {
            context.done(null, send_response(200, category));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    
}

exports.getcategorieslist = function (event, context) {
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

exports.getcategory = function (event, context) {
        Category.findAndCountAll({
            where: { state_name: event.pathParams.cat_id }
        }).then(category => {
            context.done(null, send_response(200, category));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
}

exports.updatecategory = function (event, context) {
    var _data = event.body;
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
}



exports.updatecategory_status = function (event, context) {
    var _data = event.body;

    verifyToken(event.headers).then(auther => {
        Category.update({
            cat_status: _data.cat_status,
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