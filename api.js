"use strict"

//My libs
const express = require('express');
const bodyParser = require('body-parser');

//My routes. On a larger project, this must be in a separate file

var controllerRoute = require('./routes');

//My app
var api = express();

//My middlewares
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));



//the interesting stuff happens here
api.use('/users', controllerRoute);

api.use('*', function (req, res, next) {
        res.send(`Usage : Call API (GET) at endpoint "/users/user_id/books/favourite" \nwith user_id = 1 or 2`);
});


api.listen(3000, function() {
    console.log('API started')
})
