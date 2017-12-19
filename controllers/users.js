"use strict"
let getFavouriteBook = require("./lib/getFavouriteBook");
let getUser = function (req, res, next) {

    getFavouriteBook.getbyUserID(req.params.id)
        .then(function (data) {
            res.send(data);
        })

}

module.exports = {
    getUser: getUser
}