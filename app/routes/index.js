module.exports = function(app, event) {
    require('./auth.routes')(app, event);
    require('./linkedin.routes')(app, event);
    require('./profile.routes')(app, event);
    require('./user.routes')(app, event);
    require('./order.routes')(app, event);
    require('./location.routes')(app, event);
    require('./favourite.routes')(app, event);

    require('./country.routes')(app, event);
    require('./state.routes')(app, event);
    require('./city.routes')(app, event);
    require('./notification.routes')(app, event);
    require('./sellproduct.routes')(app, event);


    

    
}