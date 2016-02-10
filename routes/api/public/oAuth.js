/**
 * Created by user on 09.02.2016.
 */
var express = require("express");
var utils = require("util");
var router = express.Router();
var db = global.container.dataBase;

router.get('/key', function(req, res, next){
    db.getApp(req.query.client_id, function(error, app){
        if(error){
            return next(error);
        }
        if(!app){
            error = new Error("App with this id is not found");
            error.status = 404;
            return next(error);
        }
        if(app.redirectURL != req.query.redirect_uri){
            error = new Error("Redirect uri does not match");
            error.status = 400;
            return next(error);
        }
        var url;
        if(!req.session.user){
            url = utils.format('/signin?%s&app_name=%s',req.originalUrl.split('?')[1],app.name);
            res.redirect(url);
            return;
        }
        url = utils.format('/agreements?%s&app_name=%s',req.originalUrl.split('?')[1],app.name);
        res.redirect(url);
    });

});



module.exports = router;