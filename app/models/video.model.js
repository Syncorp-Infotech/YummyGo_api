module.exports = (sequelize, Sequelize) => {
  const Video = sequelize.define(
    "videos",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      profile_id: Sequelize.INTEGER,
      video_link: {
        type: Sequelize.STRING(500),
      },
      video_type: {
        type: Sequelize.STRING(5),
      },
      video_note: {
        type: Sequelize.STRING(1000),
      },
      video_status: {
        type: Sequelize.STRING(1),
      },
      // public_status: {
      //   type: Sequelize.STRING(1),
      // },
      // remove_status: {
      //   type: Sequelize.STRING(1),
      // },
      created_by: {
        type: Sequelize.INTEGER,
      },
      updated_by: {
        type: Sequelize.INTEGER,
      },
    },
    {
      underscored: true,
      tableName: "video",
    }
  );

  return Video;
};
