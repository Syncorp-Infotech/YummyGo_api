module.exports = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "",
  DB: "one",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
// module.exports = {
//   HOST: "184.168.100.235",
//   USER: "yummygo",
//   PASSWORD: "yummygo@123123",
//   DB: "Yummygo_dev",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
