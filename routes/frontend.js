/**
 * Created by user on 25.01.2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/songs', function(req, res, next) {
    res.render('songs', { title: 'Песни' });
});

router.get('/artists', function(req, res, next) {
    res.render('artists', { title: 'Артисты' });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Регистрация' })
});

router.get('/signin', function(req, res, next) {
    res.render('signin', { title: 'Авторизация' })
});

module.exports = router;

