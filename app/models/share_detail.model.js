module.exports = (sequelize, Sequelize) => {
    const share_detail = sequelize.define("share_details", {
        share_detail_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        share_detail_user_id: {
            type: Sequelize.INTEGER,
        },
        share_detail_merchant_id: {
            type: Sequelize.INTEGER,
        },
        video_id: {
            type: Sequelize.INTEGER,
        },
        share_detail_status: Sequelize.STRING(1),
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'share_detail'
    });
    
    return share_detail;
}