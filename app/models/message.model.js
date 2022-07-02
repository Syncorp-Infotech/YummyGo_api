module.exports = (sequelize, Sequelize) => {

    const Chat = sequelize.define("messages", {
        message_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        profile_first_name: {
            type: Sequelize.STRING(150)
        },
        profile_last_name: {
            type: Sequelize.STRING(150)
        },
        profile_img: Sequelize.STRING(600),
        role_id: {
            type: Sequelize.INTEGER
        },
        profile_id: {
            type: Sequelize.INTEGER
        },
        message: {
            type: Sequelize.STRING(600)
        },
    }, {
        underscored: true,
        tableName: 'message'
    });
    
    return Chat;
};