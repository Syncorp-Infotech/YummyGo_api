module.exports = (sequelize, Sequelize) => {

    const Country = sequelize.define("countrys", {
        country_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        country_name: {
            type: Sequelize.STRING(100),
        },
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'country'
    });
    
    return Country;
}