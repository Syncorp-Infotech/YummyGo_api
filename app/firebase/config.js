var admin = require("firebase-admin");

var serviceAccount = require("./web-push-notification-c0c75-firebase-adminsdk-nhisj-a3660ee3f8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://careerin-359ab.firebaseio.com"
});

module.exports.admin = admin;