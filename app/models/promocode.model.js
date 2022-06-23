module.exports = (sequelize, Sequelize) => {

    const Promocode = sequelize.define("promocodes", {
        promocode_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        merchant_id: {
            type: Sequelize.INTEGER,
        },
        promocode_type: {
            type: Sequelize.STRING(100),
        },
        promocode_value: {
            type: Sequelize.DOUBLE
        },
        promocode_mini_value: {
            type: Sequelize.DOUBLE
        },
        promocode_until: {
            type: Sequelize.STRING(100),
        },
        promocode_usage: {
            type: Sequelize.DOUBLE
        },
        promocode_img: {
            type: Sequelize.STRING(1000),
        },
        promocode_status: {
            type: Sequelize.STRING(100),
        },

        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'promocode'
    });
    
    return Promocode;
}