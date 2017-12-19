"use strict"
const express = require('express');
const router = express.Router();
let users = require("./controllers/users")

/*
Evaluation
*/
//GET : evaluate string
router.get('/:id/books/favourite', users.getUser);
module.exports = router;
