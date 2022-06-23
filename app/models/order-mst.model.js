module.exports = (sequelize, Sequelize) => {

    const OrderMst = sequelize.define("order_msts", {
        order_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_no: {
            type: Sequelize.STRING(10),
        },
        order_date: {
            type: Sequelize.DATE
        },
        order_location: Sequelize.STRING(300),
        order_status: Sequelize.STRING(1),
        merchant: Sequelize.INTEGER,
        customer: Sequelize.INTEGER,
        rider: Sequelize.INTEGER,
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'order_mst'
    });
    
    return OrderMst;
}