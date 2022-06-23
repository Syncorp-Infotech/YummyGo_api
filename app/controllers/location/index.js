const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const Location = db.location;

exports.createcategory = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        Location.create({
            location_text: _data.location_text,
            location_lat: _data.location_lat,
            location_lng : _data.location_lng,
            user_id : _data.user_id,
            location_type : _data.location_type,
            location_default: _data.location_default,
            created_by: auther,
            updated_by: auther
        }).then(category => {
            context.done(null, send_response(200, category));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        console.log(err);
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.getdefault_location = function (event, context) {
    var filter = {
        where: { user_id: event.pathParams.user_id , location_default: "D"}
    };
    verifyToken(event.headers).then(auther => {
        Location.findOne(filter).then(categories => {
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
        Location.findAndCountAll({
            where: { user_id: event.pathParams.user_id }
        }).then(category => {
            context.done(null, send_response(200, category));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
    }).catch(err => {
        console.log(err);
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}





exports.updatecategory_status = function (event, context) {
    var _data = event.body;
    console.log("Update_statu",event.pathParams.old_id,event.pathParams.new_id);
    verifyToken(event.headers).then(auther => {
        Location.update({
            location_default: "",
            updated_by: auther
        }, {
            where: {
                location_id: event.pathParams.old_id
            }
        }).then(category => {
            // context.done(null, send_response(200, { message: 'Category updated successfully' }));
            Location.update({
                location_default: "D",
                updated_by: auther
            }, {
                where: {
                    location_id: event.pathParams.new_id
                }
            }).then(category => {
                context.done(null, send_response(200, { message: 'Category updated successfully' }));
            }).catch(err => {
                context.done(null, send_response(500, { message: err.message }));
            });
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.deletecategory = function (event, context) {
    verifyToken(event.headers).then(auther => {
        Location.destroy({
            where: { location_id: event.pathParams.loc_id }
        }).then(category => {
            context.done(null, send_response(200, { message: 'Location deleted successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}