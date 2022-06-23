module.exports = (sequelize, Sequelize) => {
    const follow_detail = sequelize.define("follow_details", {
        follow_detail_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        video_id: {
            type: Sequelize.INTEGER,
        },
        follow_detail_user_id: {
            type: Sequelize.INTEGER,
        },
        follow_detail_merchant_id: {
            type: Sequelize.INTEGER,
        },
        follow_detail_status: Sequelize.STRING(1),
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'follow_detail'
    });
    
    return follow_detail;
}