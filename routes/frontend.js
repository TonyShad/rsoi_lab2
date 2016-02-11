/**
 * Created by user on 25.01.2016.
 */
var express = require('express');
var checkLogin = require("./auth");
var router = express.Router();

/* GET home page. */
router.get('/songs', checkLogin, function(req, res, next) {
    res.render('songs', { title: 'Песни', login: true});
});

router.get('/artists',checkLogin, function(req, res, next) {
    res.render('artists', { title: 'Артисты', login: true});
});

router.get('/apps',checkLogin, function(req, res, next){
    res.render('apps', {title: 'Приложения', login: true});
});

router.get('/agreements',checkLogin, function(req, res, next){
    res.render('agreements', { appname: req.query.name, nonav: true });
});

module.exports = router;

