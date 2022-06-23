module.exports = (sequelize, Sequelize) => {
    
    const Product = sequelize.define("products", {
        prod_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cat_id: {
            type: Sequelize.INTEGER,
        },
        profile_id: {
            type: Sequelize.INTEGER,
        },
        prod_name: {
            type: Sequelize.STRING(100)
        },
        prod_img: Sequelize.STRING(2000),
        Pre_order_type : Sequelize.STRING(100),
        pre_order_time : Sequelize.STRING(100),
        item_name : Sequelize.STRING(100),
        item_code : Sequelize.STRING(100),
        item_start_time : Sequelize.STRING(100),
        item_end_time : Sequelize.STRING(100),
        prod_price: Sequelize.DOUBLE,
        prod_desc: Sequelize.STRING(2000),
        prod_reason : Sequelize.STRING(2000),
        prod_status: {
            type: Sequelize.STRING(1)
        },
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'product'
    });
    
    return Product;
};