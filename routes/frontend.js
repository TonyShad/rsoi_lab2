/**
 * Created by user on 25.01.2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/songs', function(req, res, next) {
    res.render('songs', { title: 'Песни', login: true});
});

router.get('/artists', function(req, res, next) {
    res.render('artists', { title: 'Артисты', login: true});
});

router.get('/apps', function(req, res, next){
    res.render('apps', {title: 'Приложения', login: true});
});

router.get('/agreements', function(req, res, next){
    res.render('agreements', { appname: req.query.name });
});

module.exports = router;

