module.exports = (sequelize, Sequelize) => {

    const Category = sequelize.define("categories", {
        cat_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cat_name: {
            type: Sequelize.STRING(100),
        },
        cat_img: {
            type: Sequelize.STRING(600)
        },
        cat_reason: {
            type: Sequelize.STRING(600)
        },
        cat_otp : {
            type: Sequelize.STRING(6)
        },
        cat_pid: {
            type: Sequelize.STRING(6)
        },
        cat_status: Sequelize.STRING(1),
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'category'
    });
    
    return Category;
}