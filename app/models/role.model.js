module.exports = (sequelize, Sequelize) => {

    const Role = sequelize.define("roles", {
        role_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_name: {
            type: Sequelize.STRING(50)
        },
        role_status: {
            type: Sequelize.STRING(1)
        }
    }, {
        underscored: true,
        tableName: 'role'
    });
    
    return Role;
};