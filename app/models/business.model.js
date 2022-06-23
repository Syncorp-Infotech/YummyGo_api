module.exports = (sequelize, Sequelize) => {

    const Business = sequelize.define("businesses", {
        biz_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        biz_name: {
            type: Sequelize.STRING(100),
        },
        biz_email: {
            type: Sequelize.STRING(320),
        },
        biz_contact: {
            type: Sequelize.STRING(20),
        },
        biz_address: Sequelize.STRING(500),
        biz_status: Sequelize.STRING(1),
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'business'
    });

    return Business;
};