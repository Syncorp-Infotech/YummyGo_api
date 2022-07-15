module.exports = (sequelize, Sequelize) => {

    const Wallet = sequelize.define("wallet", {
        wallet_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        profile_id: {
            type: Sequelize.INTEGER
        },
        yummy_pay_balance: {
            type: Sequelize.DECIMAL(15,2)
        },
        yummy_saver_balance: {
            type: Sequelize.DECIMAL(15,2)
        },
        yummy_premium_balance: {
            type: Sequelize.DECIMAL(15,2)
        },
        yummy_earning_balance: {
            type: Sequelize.DECIMAL(15,2)
        },
    }, {
        underscored: true,
        tableName: 'wallet'
    });
    
    return Wallet;
};