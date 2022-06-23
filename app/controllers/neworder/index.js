const { send_response } = require('../../utils/app.util')
const { verifyToken } = require('../../utils/jwt.util')
const db = require("../../models");
const neworder = db.neworder;
const yummysaver = db.yummysaver;

exports.createneworder = function (event, context) {
    var _data = event.body;
        neworder.create({
order_quantity: _data.order_quantity,
order_amount: _data.order_amount,
order_date: _data.order_date,
order_status: _data.order_status,
order_detail: _data.order_detail,
order_customer_id: _data.order_customer_id,
order_customer_remarks: _data.order_customer_remarks,
order_trans_id: _data.order_trans_id,
order_merchant_id: _data.order_merchant_id,
order_merchant_status: _data.order_merchant_status,
order_merchant_remarks: _data.order_merchant_remarks,
order_coupon_applied: _data.order_coupon_applied,
order_coupon: _data.order_coupon,
order_coupon_amount: _data.order_coupon_amount,
order_without_amount: _data.order_without_amount,
order_trans_type: _data.order_trans_type,
order_trans_amount: _data.order_trans_amount,
order_driver_id: _data.order_driver_id,
order_driver_status: 'NOT ACCEPTED',
order_driver_pickup_time: _data.order_driver_pickup_time,
order_driver_deliver_time: _data.order_driver_deliver_time,
order_location: _data.order_location,
merchant_location : _data.merchant_location,
distance : _data.distance,
order_driver_otp : Math.floor(100000 + Math.random() * 900000),

        }).then(neworder => {

            var filter = {
                order: [['created_at', 'DESC']],
                where: {
                customer_id : neworder.order_customer_id,
                yummysave_type : "Add Fund"
               }
            };
            yummysaver.findOne(filter).then(yummysavers => {
                console.log(yummysavers,"Test - 1");
                if(yummysavers == null){
                 context.done(null, send_response(200, neworder));
                }else{
                if(yummysavers.yummysave_refer_id == ''){
                    context.done(null, send_response(200, neworder));
                }
                else {
                    console.log(yummysavers,"Test - 2");
                        var amount = ((2.5/ 100) * +neworder.order_amount);
                        amount = amount.toFixed(2);
                        yummysaver.create({
                            yummysave_title : yummysavers.yummysave_title,
                            yummysave_desc : yummysavers.yummysave_desc,
                            yummysave_refer_status : yummysavers.yummysave_refer_status,
                            yummysave_refer_id : '',
                            yummysave_Benefits : yummysavers.yummysave_Benefits,
                            customer_id : yummysavers.yummysave_refer_id,
                            merchant_id : yummysavers.merchant_id,
                            amount : amount,
                            yummysave_type : "Benefit",
                            yummysave_refund_reason : yummysavers.yummysave_refund_reason,
                            yummysave_refund_date : yummysavers.yummysave_refund_date,
                            yummysave_amount : yummysavers.yummysave_amount,
                            yummysave_order_id : neworder.order_id,
                            yummysave_order_amount : neworder.order_amount,
                            yummysave_order_date : neworder.order_date,
                            yummysave_order_refund_status : 'Not Refund',
                        }).then(yummysaver => {
                            context.done(null, send_response(200, neworder));
                        }).catch(err => {
                            console.log(err);
                            context.done(null, send_response(500, { message: err.message }));
                        });
                } 
            }              
            }).catch(err => {
                context.done(null, send_response(500, { message: err.message }));
            });
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}

exports.getneworderlist = function (event, context) {
    var _offset = parseInt(event.queryParams.page ? event.queryParams.page : 0);
    var _limit = parseInt(event.queryParams.limit ? event.queryParams.limit : 100);
    var filter = {
        order: [['created_at', 'DESC']],
        offset: _offset,
        limit: _limit
    };

    verifyToken(event.headers).then(auther => {
        neworder.findAndCountAll(filter).then(neworder => {
            context.done(null, send_response(200, neworder));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}





exports.get_rating_neworder = function (event, context) {
    var filter = {
        include: [
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name'],
                as: 'customer_info'
            },
        ],
        where: { order_merchant_id: event.pathParams.merchant_id,
            order_status: "DELIVERED" }
     }
        neworder.findAndCountAll(filter).then(neworder => {
            context.done(null, send_response(200, neworder));
        }).catch(err => {
            console.log(err);
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
}



exports.getneworder = function (event, context) {
    var filter = {
        include: [
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name'],
                as: 'merchant_info'
            },
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name'],
                as: 'customer_info'
            },
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name'],
                as: 'driver_info'
            }

        ],
        where: { order_customer_id: event.pathParams.user_id }
     }
        neworder.findAndCountAll(filter).then(neworder => {
            context.done(null, send_response(200, neworder));
        }).catch(err => {
            console.log(err);
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
}



exports.merchant_getneworder = function (event, context) {
    console.log("******",event.pathParams.user_id);
    var filter = {
        include: [
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name'],
                as: 'merchant_info'
            },
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name'],
                as: 'customer_info'
            },
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name'],
                as: 'driver_info'
            }

        ],
        where: { order_merchant_id: event.pathParams.user_id}
     }
        neworder.findAndCountAll(filter).then(neworder => {
            context.done(null, send_response(200, neworder));
        }).catch(err => {
            console.log(err);
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
}


exports.overall_merchant_getneworder = function (event, context) {
    console.log("******",event.pathParams.user_id);
    var filter = {
        include: [
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name'],
                as: 'merchant_info'
            },
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name'],
                as: 'customer_info'
            },
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name'],
                as: 'driver_info'
            }

        ],
        where: { 
            order_merchant_id: event.pathParams.user_id,
            order_status : event.pathParams.order_status        
        }
     }
        neworder.findAndCountAll(filter).then(neworder => {
            context.done(null, send_response(200, neworder));
        }).catch(err => {
            console.log(err);
            context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
        })
}




exports.getneworderlist_by_profile = function (event, context) {
   console.log(event.pathParams.cat_id);
    var filter = {
        where: { created_by: event.pathParams.cat_id }
    };
        neworder.findAndCountAll(filter).then(neworder => {
            context.done(null, send_response(200, neworder));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        }); 
}


exports.getneworderlist_by_rider_id = function (event, context) {
    console.log(event.pathParams.rider_id);
     var filter = {
         where: { 
             order_driver_id: event.pathParams.rider_id,
             order_driver_status: "DELIVERED"
            }
     };
         neworder.findAndCountAll(filter).then(neworder => {
             context.done(null, send_response(200, neworder));
         }).catch(err => {
             context.done(null, send_response(500, { message: err.message }));
         }); 
 }


 exports.getneworderlist_by_status_list = function (event, context) {
    console.log(event.pathParams.rider_id);
     var filter = {
        include: [
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name'],
                as: 'merchant_info'
            }
        ],
         where: { 
             order_status: 'ACCEPTED',
             order_driver_status: 'NOT ACCEPTED'
        }
     };
         neworder.findAndCountAll(filter).then(neworder => {
             context.done(null, send_response(200, neworder));
         }).catch(err => {
             context.done(null, send_response(500, { message: err.message }));
         }); 
 }




exports.updateneworder = function (event, context) {
    var _data = event.body;

    verifyToken(event.headers).then(auther => {
        neworder.update({
            cat_name: _data.cat_name,
            cat_pid: _data.cat_pid,
            updated_by: auther
        }, {
            where: {
                cat_id: event.pathParams.cat_id
            }
        }).then(neworder => {
            context.done(null, send_response(200, { message: 'neworder updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.updateneworder_status = function (event, context) {
    var _data = event.body;
        neworder.update({
            order_status: _data.order_status,
        }, {
            where: {
                order_id: event.pathParams.order_id
            }
        }).then(neworder => {
            context.done(null, send_response(200, { message: 'neworder updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
   
}




exports.updateneworder_merchant_rating = function (event, context) {
    var _data = event.body;
        neworder.update({
            order_rating: _data.order_rating,
            order_rating_text: _data.order_rating_text,
        }, {
            where: {
                order_id:_data.order_id,
            }
        }).then(neworder => {
            context.done(null, send_response(200, { message: 'neworder updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}



exports.update_order_status = function (event, context) {
    var _data = event.body;
        neworder.update({
            order_driver_status: _data.order_driver_status,
            order_status : _data.order_driver_status,
            order_driver_id : _data.driver_id
        }, {
            where: {
                order_id:_data.order_id,
            }
        }).then(neworder => {
            context.done(null, send_response(200, { message: 'neworder updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}


exports.updateneworder_rider_rating = function (event, context) {
    var _data = event.body;
        neworder.update({
            order_rider_rate: _data.order_rider_rate,
            order_rider_text: _data.order_rider_text,
        }, {
            where: {
                order_id:_data.order_id,
            }
        }).then(neworder => {
            context.done(null, send_response(200, { message: 'neworder updated successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
}




exports.deleteneworder = function (event, context) {
    verifyToken(event.headers).then(auther => {
        neworder.destroy({
            where: { cat_id: event.pathParams.cat_id }
        }).then(neworder => {
            context.done(null, send_response(200, { message: 'neworder deleted successfully' }));
        }).catch(err => {
            context.done(null, send_response(500, { message: err.message }));
        });
    }).catch(err => {
        context.done(null, send_response(err.status_code ? err.status_code : 400, { message: err.message }));
    })
}



exports.getneworder_check_order_status = function (event, context) {
    console.log(event.pathParams.user_id);
     var filter = {
        include: [
            {
                model: db.profile,
                attributes: ['profile_id', 'profile_first_name', 'profile_last_name', 'profile_biz_name'],
                as: 'merchant_info'
            }
        ],
         where: { 
             order_driver_status: event.pathParams.order_driver_status,
             order_driver_id : event.pathParams.user_id
        }
     };
         neworder.findAndCountAll(filter).then(neworder => {
             context.done(null, send_response(200, neworder));
         }).catch(err => {
             context.done(null, send_response(500, { message: err.message }));
         }); 
 }


 exports.getneworder_check_otp = function (event, context) {
    console.log(event.pathParams.user_id);
     var filter = {
         where: { 
            order_driver_otp: event.pathParams.order_driver_otp,
             order_id : event.pathParams.order_id
        }
     };
         neworder.findAndCountAll(filter).then(neworder => {
             context.done(null, send_response(200, neworder));
         }).catch(err => {
             context.done(null, send_response(500, { message: err.message }));
         }); 
 }