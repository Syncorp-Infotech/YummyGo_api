module.exports = (sequelize, Sequelize) => {

    const City = sequelize.define("citys", {
        city_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city_name: {
            type: Sequelize.STRING(100),
        },
        state_name: {
            type: Sequelize.STRING(100)
        },
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'city'
    });
    
    return City;
}