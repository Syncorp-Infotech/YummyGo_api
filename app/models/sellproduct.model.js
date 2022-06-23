module.exports = (sequelize, Sequelize) => {

    const Sellproduct = sequelize.define("sellproducts", {
        sellproduct_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        location_text: {
            type: Sequelize.STRING(100)
        },
        location_lat: {
            type: Sequelize.DOUBLE
        },
        location_long: {
            type: Sequelize.DOUBLE
        },
        profile_img : {
            type: Sequelize.STRING(600)
        },
        name: {
            type: Sequelize.STRING(100)
        },
        email_id: {
            type: Sequelize.STRING(100)
        },
        phone_no: {
            type: Sequelize.STRING(100)
        },
        passport: {
            type: Sequelize.STRING(100)
        },
        certificate: {
            type: Sequelize.STRING(100)
        },
        cat_text: {
            type: Sequelize.STRING(100)
        },
        sub_cat_text: {
            type: Sequelize.STRING(100)
        },
        otp: {
            type: Sequelize.STRING(100)
        },
        user_id: {
            type: Sequelize.STRING(100)
        },
        sellproduct_status: Sequelize.STRING(1),
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'sellproduct'
    });
    
    return Sellproduct;
}