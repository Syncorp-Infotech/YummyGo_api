const { signin } = require("../controllers/auth/signin");
const {
  signup,
  ridersignup,
  verification,
  verification_fb_token,
  register,
  register_bank,
  register_profile,
  register_summary,
} = require("../controllers/auth/signup");
const {
  forgetpassword,
  passwordVerification,
  resetpassword,
  resendotp,
  email_checks,
} = require("../controllers/auth/password");

module.exports = function (app, event) {
  app.post("/auth/login", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    console.log("auth login", event.body);
    signin(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.post("/auth/signup", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    console.log("event", event);
    signup(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.post("/rider/auth/signup", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;

    ridersignup(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.post("/auth/verification", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;

    verification(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.post("/auth/fb_token", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;

    verification_fb_token(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.put("/auth/register", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    // event.files = req.files;

    register(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.put("/auth/profile/register", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    // event.files = req.files;

    register_profile(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.put("/auth/bank/register", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    // event.files = req.files;

    register_bank(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.put("/auth/summary/register", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    // event.files = req.files;

    register_summary(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.post("/auth/forgetpassword", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;

    forgetpassword(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.post("/auth/passwordverification", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;

    passwordVerification(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.post("/auth/resetpassword", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;

    resetpassword(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.post("/auth/resendotp", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;

    resendotp(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });

  app.post("/auth/email_check", function (req, res) {
    event.body = req.body;
    event.headers = req.headers;
    console.log("event_body>>>>>>>>>>>>>>>>>>>>>>>>>>>", event.body);
    email_checks(event, {
      done: function (rescode, resmsg) {
        res.header(resmsg.headers);
        res.status(resmsg.statusCode);
        res.send(resmsg.body);
      },
    });
  });
};
