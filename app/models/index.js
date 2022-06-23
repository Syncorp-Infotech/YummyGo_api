const dbConfig = require("../configs/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Schema
db.role = require("./role.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.user_referral = require("./user_referral.model.js")(sequelize, Sequelize);
db.profile = require("./profile.model.js")(sequelize, Sequelize);
db.Address = require("./address")(sequelize, Sequelize);
db.Replay = require("./Replay")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.location = require("./location.model.js")(sequelize, Sequelize);
db.favourite = require("./favourite.model.js")(sequelize, Sequelize);
db.business = require("./business.model.js")(sequelize, Sequelize);
db.announcement = require("./announcement.model.js")(sequelize, Sequelize);
db.ordermst = require("./order-mst.model.js")(sequelize, Sequelize);
db.orderdtl = require("./order-dtl.model.js")(sequelize, Sequelize);
db.video = require("./video.model")(sequelize, Sequelize);
db.video_reporting = require("./video_reporting.model.js")(
  sequelize,
  Sequelize
);
db.chat = require("./chat.model.js")(sequelize, Sequelize);

db.country = require("./country.model.js")(sequelize, Sequelize);
db.state = require("./state.model.js")(sequelize, Sequelize);
db.city = require("./city.model.js")(sequelize, Sequelize);

db.promocode = require("./promocode.model.js")(sequelize, Sequelize);

db.notification = require("./notification.model.js")(sequelize, Sequelize);
db.transcation = require("./transcation.model.js")(sequelize, Sequelize);
db.yummysaver = require("./yummysaver.model.js")(sequelize, Sequelize);

db.neworder = require("./neworder.model.js")(sequelize, Sequelize);
db.newchat = require("./newchat.model.js")(sequelize, Sequelize);
db.sellproduct = require("./sellproduct.model.js")(sequelize, Sequelize);

db.video_chat = require("./video_chat.model.js")(sequelize, Sequelize);
db.follow_detail = require("./follow_detail.model.js")(sequelize, Sequelize);
db.share_detail = require("./share_detail.model.js")(sequelize, Sequelize);
db.like_detail = require("./like_detail.model.js")(sequelize, Sequelize);

db.product_rating = require("./product_rating.model.js")(sequelize, Sequelize);

//Relationship

db.role.hasMany(db.profile, { foreignKey: "role_id", sourceKey: "role_id" });
// db.Address.belongsTo(db.user_id, {
//   foreignKey: "user_id",
//   sourceKey: "user_id",
// });
db.profile.belongsTo(db.role, { foreignKey: "role_id", targetKey: "role_id" });
db.user.belongsTo(db.profile, {
  foreignKey: "profile_id",
  targetKey: "profile_id",
});
db.user_referral.belongsTo(db.user, {
  foreignKey: "user_id",
  targetKey: "user_id",
});
db.business.hasMany(db.profile, { foreignKey: "biz_id", sourceKey: "biz_id" });
db.profile.hasOne(db.user, {
  foreignKey: "profile_id",
  targetKey: "profile_id",
});
db.category.hasMany(db.product, { foreignKey: "cat_id", sourceKey: "cat_id" });
db.product.belongsTo(db.category, {
  foreignKey: "cat_id",
  targetKey: "cat_id",
});
db.profile.hasMany(db.product, {
  foreignKey: "profile_id",
  sourceKey: "profile_id",
});
db.product.belongsTo(db.profile, {
  foreignKey: "profile_id",
  targetKey: "profile_id",
});
db.profile.hasMany(db.announcement, {
  foreignKey: "profile_id",
  sourceKey: "profile_id",
});
db.announcement.belongsTo(db.profile, {
  foreignKey: "profile_id",
  targetKey: "profile_id",
});
// db.profile.hasMany(db.ordermst, { foreignKey: 'profile_id', sourceKey: 'profile_id' });
// db.ordermst.belongsTo(db.profile, { foreignKey: 'profile_id', targetKey: 'profile_id' });
db.ordermst.hasMany(db.orderdtl, {
  foreignKey: "order_id",
  sourceKey: "order_id",
});
db.orderdtl.belongsTo(db.neworder, {
  foreignKey: "order_id",
  targetKey: "order_id",
});
db.orderdtl.belongsTo(db.product, {
  foreignKey: "prod_id",
  targetKey: "prod_id",
});
db.video.belongsTo(db.profile, {
  foreignKey: "profile_id",
  targetKey: "profile_id",
});
db.video_reporting.belongsTo(db.profile, {
  foreignKey: "profile_id",
  targetKey: "profile_id",
});
db.profile.hasMany(db.video, {
  foreignKey: "profile_id",
  sourceKey: "profile_id",
});
db.ordermst.belongsTo(db.profile, {
  as: "merchant_info",
  foreignKey: "merchant",
  targetKey: "profile_id",
});
db.ordermst.belongsTo(db.profile, {
  as: "customer_info",
  foreignKey: "customer",
  targetKey: "profile_id",
});
db.ordermst.belongsTo(db.profile, {
  as: "rider_info",
  foreignKey: "rider",
  targetKey: "profile_id",
});
db.profile.hasOne(db.favourite, {
  foreignKey: "merchant",
  sourceKey: "profile_id",
});
// db.profile.hasMany(db.favourite, { foreignKey: 'customer', sourceKey: 'profile_id' });
db.favourite.belongsTo(db.profile, {
  as: "merchant_info",
  foreignKey: "merchant",
  targetKey: "profile_id",
});
// db.favourite.belongsTo(db.profile, { as: 'customer_info', foreignKey: 'customer', targetKey: 'profile_id'});
db.video.belongsTo(db.profile, {
  as: "merchant_info",
  foreignKey: "profile_id",
  targetKey: "profile_id",
});

////New Code///

db.neworder.belongsTo(db.profile, {
  as: "merchant_info",
  foreignKey: "order_merchant_id",
  targetKey: "profile_id",
});
db.neworder.belongsTo(db.profile, {
  as: "customer_info",
  foreignKey: "order_customer_id",
  targetKey: "profile_id",
});
db.neworder.belongsTo(db.profile, {
  as: "driver_info",
  foreignKey: "order_driver_id",
  targetKey: "profile_id",
});

db.promocode.belongsTo(db.profile, {
  as: "merchant_info",
  foreignKey: "merchant_id",
  targetKey: "profile_id",
});

// db.neworder.belongsTo(db.profile, { as: 'rider_info', foreignKey: 'order_driver_id', targetKey: 'profile_id'});

db.newchat.belongsTo(db.profile, {
  as: "sender_info",
  foreignKey: "chat_sender_id",
  targetKey: "profile_id",
});
db.newchat.belongsTo(db.profile, {
  as: "receiver_info",
  foreignKey: "chat_reciver_id",
  targetKey: "profile_id",
});

module.exports = db;
