module.exports = (sequelize, Sequelize) => {
    const like_detail = sequelize.define("like_details", {
        like_detail_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        video_id: {
            type: Sequelize.INTEGER,
        },
        like_detail_user_id: {
            type: Sequelize.INTEGER,
        },
        like_detail_merchant_id: {
            type: Sequelize.INTEGER,
        },
        like_detail_status: Sequelize.STRING(1),
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'like_detail'
    });
    
    return like_detail;
}