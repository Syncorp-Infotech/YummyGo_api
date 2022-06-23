module.exports = (sequelize, Sequelize) => {

    const Video_reporting = sequelize.define("video_reportings", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
		video_id: {
            type: Sequelize.INTEGER,
        },
		comment: {
            type: Sequelize.TEXT
        },
		created_by: Sequelize.INTEGER,
        updated_by: Sequelize.INTEGER
    }, 
	{
        underscored: true,
        tableName: 'video_reporting'
    });
    
    return  Video_reporting;
};