const { send_response } = require('../../utils/app.util');
const { verifyToken } = require('../../utils/jwt.util');
const db = require("../../models");
const Favourite = db.favourite;

exports.createfav = function (event, context) {
    var _data = event.body;
    console.log(_data);
    console.log("request", _data);
    Favourite.create({
        customer: _data.customer,
        merchant: _data.merchant
    }).then(favourite => {
        context.done(null, send_response(200, favourite));
    }).catch(err => {
        console.log(err);
        context.done(null, send_response(500, { message: err.message }));
    });
}

exports.viewfav = function (event, context) {
    console.log("*************",event.pathParams);
        var filter = {
            where: {
        customer: event.pathParams.customer,
        merchant: event.pathParams.merchant
            }
        };
        Favourite.findOne(filter).then(post => {
            context.done(null, send_response(200, post));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}

exports.deletefav = function (event, context) {
    console.log('Delete Fav -- ', event.pathParams);

        Favourite.destroy({
            where: { merchant: event.pathParams.mer_id, customer: event.pathParams.cus_id }
        }).then(category => {
            context.done(null, send_response(200, { message: 'Favourite deleted successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
   
}

exports.listfav = function (event, context) {
    console.log(event.pathParams.user_id);
        var filter = {
            include: [
                {
                    model: db.profile,
                    attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name' , 'profile_address' , 'profile_img' , 'profile_summary', 'profile_contact','cuisine','categorys'],
                    as: 'merchant_info'
                }
            ],
            where: {
                customer: event.pathParams.user_id,
            },
            order: [['created_at', 'DESC']]
        };
        Favourite.findAndCountAll(filter).then(favs => {
            context.done(null, send_response(200, favs));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
 
}



exports.merchant_id_listfav = function (event, context) {
    console.log(event.pathParams.merchant_id);
        var filter = {
            where: {
                merchant: event.pathParams.merchant_id,
            }
        };
        Favourite.findAndCountAll(filter).then(favs => {
            console.log("11111111111",favs);
            context.done(null, send_response(200, favs));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
 
}


