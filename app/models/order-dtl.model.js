module.exports = (sequelize, Sequelize) => {

    const OrderDtl = sequelize.define("order_dtls", {
        order_dtl_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: Sequelize.INTEGER,
        },
        prod_id: {
            type: Sequelize.INTEGER,
        },
        prod_qty: {
            type: Sequelize.INTEGER,
        },
        prod_price: Sequelize.DOUBLE,
        prod_total_price: Sequelize.DOUBLE,
        mercant_price: Sequelize.DOUBLE,
        mercant_price_total: Sequelize.DOUBLE,
        commission_amount: Sequelize.DOUBLE,
        commission_amount_total: Sequelize.DOUBLE,
        order_dtl_status: Sequelize.STRING(1),
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'order_dtl'
    });
    
    return OrderDtl;
}