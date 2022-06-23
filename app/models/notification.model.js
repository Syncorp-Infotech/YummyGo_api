module.exports = (sequelize, Sequelize) => {

    const Notification = sequelize.define("notifications", {
        note_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        profile_id: {
            type: Sequelize.INTEGER
        },
        note_title: {
            type: Sequelize.STRING(100)
        },
        note_content: {
            type: Sequelize.STRING(600)
        },
        note_status: {
            type: Sequelize.STRING(1)
        }
    }, {
        underscored: true,
        tableName: 'notification'
    });
    
    return Notification;
};