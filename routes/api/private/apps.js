/**
 * Created by user on 09.02.2016.
 */
var express = require("express");

var router = express.Router();
var db = global.container.dataBase;


router.route("/apps")
    .post(function(req, res, next){
        if(!req.body.name){
            var error = new Error("Не введено имя приложения (name)");
            error.status = 400;
            return next(error);
        }
        var secret = Math.floor(Math.random() * 1000000);
        db.addApp(req.body.name, req.body.redirectURL, secret, req.oAuth.user, function(error, data){
            if(error){
                return next(error);
            }
            res.send({
                clienID: data.insertedId.toString(),
                secret: secret
            });
            res.end();
        });

    })
    .get(function(req, res, next){
        db.getApps(function(error, appList){
            if(error){
                return next(error);
            }
            res.send(appList);
            res.end();
        });
    });

router.route("/apps/:id")
    .delete(function(req, res, next){
        db.removeApp(req.params.id,function(error) {
            if (error) {
                return next(error);
            }
            res.end();
        });
    });



module.exports = router;