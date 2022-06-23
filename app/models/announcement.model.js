module.exports = (sequelize, Sequelize) => {

    const Announcement = sequelize.define("announcements", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ann_title: {
            type: Sequelize.STRING(150),
        },
        ann_category: {
            type: Sequelize.STRING(150)
        },
        ann_panel: Sequelize.STRING(150),
        ann_message: Sequelize.STRING(1000),
        ann_attachment: Sequelize.STRING(600),
        ann_from: Sequelize.DATE,
        ann_to: Sequelize.DATE,
        ann_status: Sequelize.STRING(1),
        profile_id: Sequelize.INTEGER,
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'announcement'
    });
    
    return Announcement;
}