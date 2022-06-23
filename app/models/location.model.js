module.exports = (sequelize, Sequelize) => {

    const Locations = sequelize.define("locations", {
        location_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        location_text: {
            type: Sequelize.STRING(100),
        },
        location_type: {
            type: Sequelize.STRING(25),
        },
        location_lat: Sequelize.DOUBLE,
        location_lng: Sequelize.DOUBLE,
        user_id : Sequelize.INTEGER,
        location_default: Sequelize.STRING(1),
        created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, {
        underscored: true,
        tableName: 'location'
    });
    
    return Locations;
}