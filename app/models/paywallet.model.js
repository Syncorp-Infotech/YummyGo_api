module.exports = (sequelize, Sequelize) => {

    const Paywallet = sequelize.define("paywallet", {
        transaction_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        profile_id: {
            type: Sequelize.INTEGER
        },
        transaction_date: {
            type: Sequelize.DATE
        },
        payment_from: {
            type: Sequelize.INTEGER
        },
        payment_to:{
            type: Sequelize.STRING(600)
        },
        order_id: {
            type: Sequelize.INTEGER
        },
        merchant_id: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.DECIMAL(15,2)
        },
        transaction_type:{
            type: Sequelize.STRING(600)
        },
        transaction_details:{
            type: Sequelize.STRING(600)
        },
        amount_before_charges: {
            type: Sequelize.DECIMAL(15,2)
        },
        charges:{
            type: Sequelize.STRING(100)
        },
        charges_type:{
            type: Sequelize.STRING(200)
        },
        charges_value:{
            type: Sequelize.STRING(600)
        },
        transaction_status:{
            type: Sequelize.STRING(600)
        },
    }, {
        underscored: true,
        tableName: 'paywallet'
    });
    
    return Paywallet;
};