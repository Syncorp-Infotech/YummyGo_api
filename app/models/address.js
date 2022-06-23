module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define(
    "address",
    {
      Address_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.STRING(150),
      },
      address: {
        type: Sequelize.STRING(150),
      },
      latitude: {
        type: Sequelize.STRING(150),
      },
      longitude: Sequelize.STRING(150),
      address_label: Sequelize.STRING(50),
      land_mark: Sequelize.STRING(50),
      delivery_note: Sequelize.STRING(50),
      door_no: Sequelize.STRING(50),
    },
    {
      underscored: true,
      tableName: "address",
    }
  );

  return Address;
};
