module.exports = (sequelize, Sequelize) => {

    const Chat = sequelize.define("chats", {
        chat_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        chat_sender: {
            type: Sequelize.INTEGER
        },
        chat_receiver: {
            type: Sequelize.INTEGER
        },
        chat_content: {
            type: Sequelize.STRING(600)
        },
        chat_status: {
            type: Sequelize.STRING(1)
        }
    }, {
        underscored: true,
        tableName: 'chat'
    });
    
    return Chat;
};