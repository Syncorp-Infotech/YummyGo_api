const { verifyToken } = require('../../utils/jwt.util')
const { send_response, uniqueId } = require('../../utils/app.util');
const { sendEmail } = require('../../utils/mail.util');
const authConfig = require("../../configs/auth.config");
const fs = require('fs');
const db = require("../../models");
const { initParams } = require('request');
const Category = db.category;
const User = db.user;

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

exports.getMerchantsCategories = function (event, context) {
    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);
    var _whereCond = { cat_status: "A" };
    if(event.pathParams.cat_id){
        _whereCond['cat_id'] = event.pathParams.cat_id;
    }
    if(event.pathParams.merchant_id && event.pathParams.merchant_id!='0'){
        _whereCond['created_by'] = event.pathParams.merchant_id;
    }
    var filter = {
        order: [['created_at', 'DESC']],
        offset: _offset,
        limit: _limit,
        where: _whereCond
    };
        Category.findAndCountAll(filter).then(categories => {
            context.done(null, send_response(200, categories));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}

exports.initDeleteCategory = function(event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(author => {
        User.findOne({
            where: {
                user_id: author
            }
        }).then(user => {
        var cat_otp =  uniqueId(4);
        Category.update({
            cat_reason : _data.cat_reason,
            cat_otp: cat_otp,
            updated_by: author
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(category => {
            var _msghtml = fs.readFileSync('./app/templates/deleteConfirmationotp.html', 'utf8');
            const message = {
                from: authConfig.smtp.sender,
                to: user.user_login,
                subject: 'Foodie Category Delete OTP',
                html: _msghtml.replace("@FoodieUser", 'Foodie').replace("@Email", user.user_login).replace("@CODEHERE", cat_otp)
            };
            sendEmail(message);

            context.done(null, send_response(200, { message: 'Otp sent successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });

        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
};
exports.updateCategory = function(event, context) {
    var _data = event.body;
    verifyToken(event.headers).then(author => {
        Category.findOne({
            where: { cat_id: event.pathParams.cat_id, cat_otp: _data.cat_otp }
        }).then(category => {
            if(category){
                Category.update({
                    cat_status: _data.status,
                    updated_by: author
                }, {
                    where: {
                        cat_id: event.pathParams.cat_id, 
                    }
                }).then(category => {
                    context.done(null, send_response(200, { message: 'Category deleted  successfully' }));
                }).catch(err => {
                    context.done(null, send_response(500, { message: err.message }));
                });
            }else {
                context.done(null, send_response(400, { message: "Otp is invalid" }));
            }
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
};

