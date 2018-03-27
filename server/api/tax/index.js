'use strict'

var express = require('express'),
    controller = require('./tax.controller'),
    router = express.Router();

router.post('/', controller.index);

module.exports = router;