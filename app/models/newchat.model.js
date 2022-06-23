module.exports = (sequelize, Sequelize) => {

    const Newchat = sequelize.define("newchat", {
        chat_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        chat_title: {
            type: Sequelize.STRING(100),
        },
        chat_status: {
            type: Sequelize.STRING(600)
        },
        chat_start_time: {
            type: Sequelize.STRING(600)
        },
        chat_end_time: {
            type: Sequelize.STRING(600)
        },
        chat_sender_id: {
            type: Sequelize.INTEGER,
        },
        chat_reciver_id: {
            type: Sequelize.INTEGER,
        },
        chat_user_type: {
            type: Sequelize.STRING(600)
        },
        chat_type: {
            type: Sequelize.STRING(600)
        },
        chat_text: {
            type: Sequelize.STRING(600)
        },
        chat_location: {
            type: Sequelize.STRING(600)
        },
        chat_img: {
            type: Sequelize.STRING(600)
        },
        chat_head: {
            type: Sequelize.STRING(600)
        },
        chat_attend_by: {
            type: Sequelize.STRING(600)
        },
        chat_read_status: {
            type: Sequelize.STRING(600)
        },
        chat_name: {
            type: Sequelize.STRING(600)
        },
        chat_user_id : Sequelize.INTEGER,
        chat_admin_id : Sequelize.INTEGER,
        chat_merchant_id : Sequelize.INTEGER,
        chat_driver_id : Sequelize.INTEGER,
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'newchat'
    });
    return Newchat;
}