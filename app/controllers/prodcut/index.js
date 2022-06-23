const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const { uploadFile } = require('../../utils/s3.util')
const db = require("../../models");
const Category = db.category;
const Product = db.product;
const Profile = db.profile;

exports.createproduct = function (event, context) {
    var _data = event.body;

    verifyToken(event.headers).then(auther => {
        Product.create({
            cat_id : _data.cat_id,
            profile_id : _data.profile_id,
            prod_name : _data.prod_name,
            prod_img : _data.prod_img,
            Pre_order_type :_data.Pre_order_type,
            pre_order_time : _data.pre_order_time,
            item_name : _data.item_name,
            item_code : _data.item_code,
            item_start_time : _data.item_start_time,
            item_end_time : _data.item_end_time,
            prod_price : _data.prod_price,
            prod_desc : _data.prod_desc,
            prod_reason : '',
            prod_status: 'A',
            created_by: auther,
            updated_by: auther
        }).then(product => {
            context.done(null, send_response(200, product));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.getproductslist = function (event, context) {
    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);
    var filter = {
        include: [
            {
                model: Category,
                attributes: ['cat_id', 'cat_name']
            },
            {
                model: Profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name']
            }
        ],
        order: [['prod_name']],
        offset: _offset,
        limit: _limit
    };

    verifyToken(event.headers).then(auther => {
        Product.findAndCountAll(filter).then(products => {
            context.done(null, send_response(200, products));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.getproductslistbycatid = function (event, context) {
    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);
    var filter = {
        include: [
            {
                model: Category,
                attributes: ['cat_id', 'cat_name']
            },
            {
                model: Profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name']
            }
        ],
        where: {
            cat_id: event.pathParams.cat_id
        },
        order: [['prod_name']],
        offset: _offset,
        limit: _limit
    };
        Product.findAndCountAll(filter).then(products => {
            context.done(null, send_response(200, products));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
 
}

exports.getproductslistbymerchant = function (event, context) {
    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);
    var filter = {
        include: [
            {
                model: Category,
                attributes: ['cat_id', 'cat_name']
            },
            {
                model: Profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name']
            }
        ],
        where: {
            profile_id: event.pathParams.profile_id
        },
        order: [['prod_name']],
        offset: _offset,
        limit: _limit
    };

    // verifyToken(event.headers).then(auther => {
        Product.findAndCountAll(filter).then(products => {
            context.done(null, send_response(200, products));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    // }).catch(err => {
    //     context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    // })
}

exports.getproduct = function (event, context) {
    verifyToken(event.headers).then(auther => {
        Product.findOne({
            include: [
                {
                    model: Category,
                    attributes: ['cat_id', 'cat_name']
                },
                {
                    model: Profile,
                    attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name']
                }
            ],
            where: { prod_id: event.pathParams.prod_id }
        }).then(product => {
            context.done(null, send_response(200, product));
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}





exports.updateproduct_status = function (event, context) {
    var _data = event.body;

    verifyToken(event.headers).then(auther => {
        Product.update({
            prod_status: _data.prod_status,
            prod_reason : _data.prod_reason,
            updated_by: auther
        }, {
            where: {
                prod_id: event.pathParams.prod_id
            }
        }).then(product => {
            context.done(null, send_response(200, { message: 'Product updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.updateproduct = function (event, context) {
    var _data = event.body;

    verifyToken(event.headers).then(auther => {
        Product.update({
            cat_id : _data.cat_id,
            profile_id : _data.profile_id,
            prod_name : _data.prod_name,
            prod_img : _data.prod_img,
            Pre_order_type :_data.Pre_order_type,
            pre_order_time : _data.pre_order_time,
            item_name : _data.item_name,
            item_code : _data.item_code,
            item_start_time : _data.item_start_time,
            item_end_time : _data.item_end_time,
            prod_price : _data.prod_price,
            prod_desc : _data.prod_desc,
            updated_by: auther
        }, {
            where: {
                prod_id: event.pathParams.prod_id
            }
        }).then(product => {
            context.done(null, send_response(200, { message: 'Product updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.deleteproduct = function (event, context) {
    verifyToken(event.headers).then(auther => {
        Product.destroy({
            where: { prod_id: event.pathParams.prod_id }
        }).then(product => {
            context.done(null, send_response(200, { message: 'Product deleted successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}

exports.uploadProdImg = function (event, context) {
    const file = event.files.prodimg;

    verifyToken(event.headers).then(auther => {
        uploadFile(file, 'prodimgs').then((fileurl) => {
            
            Product.update({
                prod_img: fileurl,
                updated_by: auther
            }, {
                where: {
                    prod_id: event.pathParams.prod_id
                }
            }).then(product => {
                context.done(null, send_response(200, { message: 'Product image uploaded successfully' }));
            }).catch(err => {
                context.done(null, send_response(500, { message: err.message }));
            });
        }).catch(err => {
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}