const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const config = require('../configs/auth.config')
const { uniqueString } = require('../utils/app.util')
const { verifyandsignup } = require('../controllers/auth/linkedin')

// API Access link for creating client ID and secret:
// https://www.linkedin.com/secure/developer

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Linkedin profile is
//   serialized and deserialized.
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Use the LinkedinStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Linkedin
//   profile), and invoke a callback with a user object.
passport.use(new LinkedInStrategy({
    clientID: config.linkedin.CLIENT_ID,
    clientSecret: config.linkedin.CLIENT_SECRET,
    callbackURL: config.linkedin.CALLBACK_URL,
    scope: ['r_liteprofile', 'r_emailaddress'],
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        // req.session.accessToken = accessToken;
        process.nextTick(function () {
            // To keep the example simple, the user's Linkedin profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Linkedin account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }
));

module.exports = function (app) {

    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(passport.initialize());
    app.use(passport.session());

    // GET /auth/linkedin
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Linkedin authentication will involve
    //   redirecting the user to linkedin.com.  After authorization, Linkedin
    //   will redirect the user back to this application at /auth/linkedin/callback
    app.get('/auth/linkedin',
        passport.authenticate('linkedin', { state: uniqueString(10) }),
        function (req, res) {
            // The request will be redirected to Linkedin for authentication, so this
            // function will not be called.
        });

    // GET /auth/linkedin/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin', { failureRedirect: '/auth/fail' }),
        function (req, res) {
            // res.redirect('/');

            var _linkedInUser = req.user;
            var _user = {
                user_name: _linkedInUser.displayName,
                user_email: _linkedInUser.emails ? _linkedInUser.emails[0].value : '',
                linkedin: _linkedInUser.id,
                user_img: _linkedInUser.photos ? _linkedInUser.photos[0].value : ''
            }
            verifyandsignup(_user).then(carinuser => {
                var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
                responseHTML = responseHTML.replace('%value%', JSON.stringify({
                    user: carinuser
                }));
                res.status(200).send(responseHTML);
            }, err => {
                console.log('verifyandsignup err ', err);
                res.status(400).send(err);
            });

        });
}