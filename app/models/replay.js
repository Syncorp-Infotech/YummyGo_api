module.exports = (sequelize, Sequelize) => {
  const Replay = sequelize.define(
    "Replay",
    {
      Replay_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Replay_profile_id: {
        type: Sequelize.STRING(150),
      },
      Replay_user_name: {
        type: Sequelize.STRING(150),
      },
      Replay_user_image: {
        type: Sequelize.STRING(150),
      },
      Replay_video_id: {
        type: Sequelize.STRING(150),
      },
      Replay_replay_id: {
        type: Sequelize.STRING(150),
      },
      Replay_message: { type: Sequelize.STRING(150) },
    },
    {
      underscored: true,
      tableName: "Replay",
    }
  );

  return Replay;
};
