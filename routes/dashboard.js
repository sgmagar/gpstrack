var express = require('express');
var router = express.Router();

var app = require('../app')


router.get('/', function (req, res, next){
	res.sendFile('/templates/dashboard.html', {root: __dirname.substring(0, __dirname.indexOf('routes'))});
});


module.exports = router;