const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

var fileupload = require("express-fileupload");
app.use(fileupload());
//app.use(bodyParser.urlencoded());
//app.use(bodyParser.json());
//app.use(
//  bodyParser.urlencoded({
//    extended: true,
//  })
//);

var allowedDomains = ["http://app.foodie.ml", "http://localhost:4200"];
var corsOptions = {
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);

    if (allowedDomains.indexOf(origin) === -1) {
      var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};
app.use(cors());

// app.use(function (req, res, next) {
//   var origin = req.headers.origin;
//   if(allowedDomains.indexOf(origin) > -1){
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }

//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept, x-access-token');
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   next();
// });

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
// database
const db = require("./models");

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Foodie application. Running version : 1.0.4",
  });
});

var event = {
  stageVariables: {},
};
// routes
require("./routes/auth.routes")(app, event);
require("./routes/address")(app, event);
require("./routes/replay.routes")(app, event);
require("./routes/user.routes")(app, event);
require("./routes/profile.routes")(app, event);
require("./routes/myreferal.routes")(app, event);
require("./routes/chat.routes")(app, event);
require("./routes/category.routes")(app, event);
require("./routes/product.routes")(app, event);
require("./routes/video.routes")(app, event);
require("./routes/video_reportings.routes")(app, event);
require("./routes/merchant.routes")(app, event);
require("./routes/order.routes")(app, event);
require("./routes/location.routes")(app, event);
require("./routes/favourite.routes")(app, event);
require("./routes/country.routes")(app, event);
require("./routes/state.routes")(app, event);
require("./routes/city.routes")(app, event);
require("./routes/promocode.routes")(app, event);
require("./routes/notification.routes")(app, event);
require("./routes/transcation.routes")(app, event);
require("./routes/yummysaver.routes")(app, event);
require("./routes/neworder.routes")(app, event);
require("./routes/newchat.routes")(app, event);
require("./routes/sellproduct.routes")(app, event);

require("./routes/video_chat.routes")(app, event);
require("./routes/follow_detail.routes")(app, event);
require("./routes/share_detail.routes")(app, event);
require("./routes/like_detail.routes")(app, event);

require("./routes/product_rating.routes")(app, event);
// require('./routes/merchant_rating.routes')(app, event);

///new Screen API////

module.exports = app;
