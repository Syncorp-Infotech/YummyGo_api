module.exports = (sequelize, Sequelize) => {

    const State = sequelize.define("states", {
        state_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        country_name: {
            type: Sequelize.STRING(100),
        },
        state_name: {
            type: Sequelize.STRING(100)
        },
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'state'
    });
    
    return State;
}