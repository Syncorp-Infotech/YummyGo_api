module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_login: {
        type: Sequelize.STRING(320),
      },
      user_password: {
        type: Sequelize.STRING(100),
      },
      user_otp: {
        type: Sequelize.STRING(10),
      },
      user_status: {
        type: Sequelize.STRING(1),
      },
      profile_id: {
        type: Sequelize.INTEGER,
      },
      fb_token: {
        type: Sequelize.STRING(600),
      },
      fcm_mtoken: {
        type: Sequelize.TEXT,
      },
      fcm_wtoken: {
        type: Sequelize.TEXT,
      },
      referral_code: {
        type: Sequelize.TEXT,
      },
      created_by: Sequelize.INTEGER,
      updated_by: Sequelize.INTEGER,
    },
    {
      underscored: true,
      tableName: "user",
    }
  );

  return User;
};
