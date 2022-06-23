module.exports = (sequelize, Sequelize) => {

    const Product_rating = sequelize.define("product_ratings", {
        pr_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pr_product_id: {
            type: Sequelize.STRING(100),
        },
        pr_merchant_id: {
            type: Sequelize.STRING(100),
        },
        pr_user_id: {
            type: Sequelize.STRING(100)
        },
        pr_user_name: {
            type: Sequelize.STRING(100)
        },
        pr_user_img: {
            type: Sequelize.STRING(600)
        },
        pr_order_id: {
            type: Sequelize.STRING(100)
        },
        pr_rating : {
            type: Sequelize.INTEGER,
        },
        pr_rating_date: {
            type: Sequelize.STRING(100)
        },
        pr_rating_text: {
            type: Sequelize.STRING(600)
        },
        pr_status: Sequelize.STRING(1),
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'product_rating'
    });
    
    return Product_rating;
}