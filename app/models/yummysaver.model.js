module.exports = (sequelize, Sequelize) => {

    const Yummysaver = sequelize.define("yummysavers", {
        yummysave_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        yummysave_title: {
            type: Sequelize.STRING(100),
        },
        yummysave_desc: {
            type: Sequelize.STRING(600)
        },
        yummysave_refer_status: {
            type: Sequelize.STRING(600)
        },
        yummysave_refer_id : {
            type: Sequelize.STRING(600)
        },
        yummysave_Benefits: {
            type: Sequelize.STRING(600)
        },
        customer_id: {
            type: Sequelize.INTEGER,
        },
        merchant_id: {
            type: Sequelize.STRING(600)
        },
        amount: Sequelize.DOUBLE,


        yummysave_type: {
            type: Sequelize.STRING(600)
        },
        yummysave_refund_reason: {
            type: Sequelize.STRING(600)
        },
        yummysave_refund_date: {
            type: Sequelize.STRING(600)
        },
        yummysave_amount: {
            type: Sequelize.STRING(600)
        },

        yummysave_order_id: {
            type: Sequelize.STRING(600)
        },
        yummysave_order_amount: {
            type: Sequelize.STRING(600)
        },
        yummysave_order_date: {
            type: Sequelize.STRING(600)
        },
        yummysave_order_refund_status: {
            type: Sequelize.STRING(600)
        },
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'yummysaver'
    });
    
    return Yummysaver;
}