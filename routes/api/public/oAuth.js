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

router.get('/keyAccepted', function(req, res, next){
    var accessKey = Math.floor(Math.random()*10000000);
    db.addAccessKey(req.query.client_id, req.session.user, accessKey, function(error){
        if(error){
            return next(error);
        }
        var url = req.query.redirect_uri + "?code="+accessKey;
        res.send({
            url: url
        });
        res.end();
    });

});

router.post('/token', function(req, res, next){
    if(!req.body.client_id || !req.body.client_secret || !req.body.code || !req.body.redirect_uri){
        var error = new Error("required params (client_id, client_secret, code, redirect_uri)");
        error.status = 400;
        return next(error);
    }
    db.getApp(req.body.client_id, function(error, app){
        if(error){
            return next(error);
        }
        if(!app){
            error = new Error("App with this id is not found");
            error.status = 404;
            return next(error);
        }
        if(app.redirectURL != req.body.redirect_uri){
            error = new Error("Redirect uri does not match");
            error.status = 400;
            return next(error);
        }
        if(app.secret != req.body.client_secret){
            error = new Error("This client-secret doesnt match with this client's secret");
            error.status = 400;
            return next(error);
        }
        db.getKey(req.body.client_id, req.body.code, function(error, key){
            if(error){
                return next(error);
            }
            if(!key){
                error = new Error("Couldnt finde such access key");
                error.status = 404;
                return next(error);
            }
            var accessToken = Math.floor(Math.random()*10000000);
            db.addToken( key.appId, key.userId, accessToken, function(error){
                if(error){
                    return next(error);
                }
                res.send({
                    access_token: accessToken
                });
                res.end();
            });
        });
    });
});


module.exports = router;