const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const sellproduct = db.sellproduct;

exports.createsellproduct = function (event, context) {
    var _data = event.body;
    console.log(_data.profile_img);
        sellproduct.create({
      location_text :_data.location_text,
      location_lat : _data.location_lat,
      location_long : _data.location_long,
      profile_img : _data.profile_img,
      name : _data.name,
      email_id : _data.email_id,
      phone_no : _data.phone_no,
      passport : _data.passport,
      certificate : _data.certificate,
      cat_text : _data.cat_text,
      sub_cat_text : _data.sub_cat_text,
      otp : _data.otp,
      user_id : _data.user_id,
      sellproduct_status : _data.sellproduct_status,
        }).then(sellproduct => {
            context.done(null, send_response(200, sellproduct));
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
        limit: _limit,
        where: { cat_status: "A" }
    };
    verifyToken(event.headers).then(auther => {
        sellproduct.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.getsellproduct = function (event, context) {
    verifyToken(event.headers).then(auther => {
        sellproduct.findOne({
            where: { cat_id: event.pathParams.cat_id }
        }).then(sellproduct => {
            context.done(null, send_response(200, sellproduct));
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
        sellproduct.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        }); 
}


exports.updatesellproduct = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        sellproduct.update({
            sellproduct_status: "Verified",
        }, {
            where: {
                otp: event.pathParams.cat_id
            }
        }).then(sellproduct => {
            context.done(null, send_response(200, { message: 'sellproduct updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.updatesellproduct_status = function (event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(auther => {
        sellproduct.update({
            cat_status: _data.cat_status,
            cat_pid: _data.cat_pid,
            cat_reason : _data.cat_reason,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(sellproduct => {
            context.done(null, send_response(200, { message: 'sellproduct updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}


exports.deletesellproduct = function (event, context) {
    verifyToken(event.headers).then(auther => {
        sellproduct.destroy({
            where: { cat_id: event.pathParams.cat_id }
        }).then(sellproduct => {
            context.done(null, send_response(200, { message: 'sellproduct deleted successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}