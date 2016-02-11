/**
 * Created by user on 27.01.2016.
 */
var express = require("express");
var checkLogin = require("../../auth");

var router = express.Router();
var db = global.container.dataBase;

module.exports = router;

router.route("/artists")
    .get(checkLogin, function(req, res, next){
        db.getArtists(function(error, artistList){
            if(error){
                return next(error);
            }
            res.send(artistList);
            res.end();
        });
    })
    .post(checkLogin, function(req, res, next){
        if(!req.body.name){
            var error = new Error("Параметрами запроса должен быть name");
            error.status = 400;
            return next(error);
        }
        db.addArtist(req.body.name, function(error, data){
            if(error){
                return next(error);
            }
            res.send({
                id: data.insertedId.toString()
            });
            res.end();
        });
    });

router.route("/artists/:id")
    .delete(checkLogin, function(req, res, next){
        db.removeArtist(req.params.id,function(error) {
            if (error) {
                return next(error);
            }
            res.end();
        });
    });