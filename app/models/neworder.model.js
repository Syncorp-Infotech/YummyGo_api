module.exports = (sequelize, Sequelize) => {

    const Neworder = sequelize.define("neworder", {
        order_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_quantity: {
            type: Sequelize.STRING(100),
        },
        order_amount: {
            type: Sequelize.STRING(100)
        },
        order_date: {
            type: Sequelize.STRING(100)
        },
        order_status : {
            type: Sequelize.STRING(100)
        },
        order_detail: {
            type: Sequelize.STRING(6000)
        },
        order_customer_id: {
            type: Sequelize.INTEGER,
        },
        order_customer_remarks: {
            type: Sequelize.STRING(100),
        },
        order_trans_id: {
            type: Sequelize.STRING(100),
        },
        order_merchant_id: {
            type: Sequelize.INTEGER,
        },
        order_merchant_status: {
            type: Sequelize.STRING(100),
        },
        order_merchant_remarks: {
            type: Sequelize.STRING(100),
        },
        order_coupon_applied: {
            type: Sequelize.STRING(100),
        },
        order_coupon: {
            type: Sequelize.STRING(100),
        },
        order_coupon_amount: {
            type: Sequelize.STRING(100),
        },
        order_without_amount: {
            type: Sequelize.STRING(100),
        },
        order_trans_type: {
            type: Sequelize.STRING(100),
        },
        order_trans_amount: {
            type: Sequelize.STRING(100),
        },
        order_driver_id: {
            type: Sequelize.INTEGER,
        },
        order_driver_status: {
            type: Sequelize.STRING(100),
        },
        order_driver_pickup_time: {
            type: Sequelize.STRING(100),
        },
        order_driver_deliver_time: {
            type: Sequelize.STRING(100),
        },
        order_driver_remarks: {
            type: Sequelize.STRING(100),
        },
        order_driver_otp : Sequelize.INTEGER,
        order_rider_rate: Sequelize.INTEGER,
        order_rider_text: Sequelize.STRING(600),
        order_rating: Sequelize.INTEGER,
        order_rating_text: Sequelize.STRING(600),
        order_location : Sequelize.STRING(600),
        merchant_location : Sequelize.STRING(600),
        distance : Sequelize.DOUBLE,
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'neworder'
    });
    
    return Neworder;
}