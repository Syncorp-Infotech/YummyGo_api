module.exports = (sequelize, Sequelize) => {

    const Video_chat = sequelize.define("video_chats", {
        video_chat_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        video_id: {
            type: Sequelize.INTEGER,
        },
        chat_user_id: {
            type: Sequelize.INTEGER,
        },
        chat_merchat_id: {
            type: Sequelize.INTEGER,
        },
        user_image: Sequelize.STRING(300),
        user_name: Sequelize.STRING(200),
        user_created_date: Sequelize.STRING(200),
        reply_record: Sequelize.STRING(6000),
        type: Sequelize.STRING(100),
        text: Sequelize.STRING(200),
        location: Sequelize.STRING(200),
        image: Sequelize.STRING(200),
        chat_like_status: Sequelize.STRING(10),
        chat_like_data: Sequelize.STRING(6000),
        video_chat_status: Sequelize.STRING(1),
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'video_chat'
    });
    
    return Video_chat;
}