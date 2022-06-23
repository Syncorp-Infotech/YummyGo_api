module.exports = (sequelize, Sequelize) => {

    const Transcation = sequelize.define("transcations", {
        trans_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        trans_name: {
            type: Sequelize.STRING(100),
        },
        trans_img: {
            type: Sequelize.STRING(600)
        },
        trans_desc: {
            type: Sequelize.STRING(600)
        },
        trans_type : {
            type: Sequelize.STRING(600)
        },
        trans_date: {
            type: Sequelize.STRING(600)
        },
        customer_id: {
            type: Sequelize.STRING(600)
        },
        merchant_id: {
            type: Sequelize.STRING(600)
        },
        order_id: {
            type: Sequelize.STRING(600)
        },
        amount: Sequelize.DOUBLE,
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'transcation'
    });
    
    return Transcation;
}