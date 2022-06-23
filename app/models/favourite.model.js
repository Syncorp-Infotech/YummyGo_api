module.exports = (sequelize, Sequelize) => {
    const Favourite = sequelize.define("favourite", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        merchant: Sequelize.INTEGER,
        customer: Sequelize.INTEGER,
        created_by: {
            type: Sequelize.INTEGER,
        },
        updated_by: {
            type: Sequelize.INTEGER
        }
    }, {
        underscored: true,
        tableName: 'favourite'
    });
    
    return Favourite;
};