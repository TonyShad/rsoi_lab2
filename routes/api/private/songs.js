/**
 * Created by user on 25.01.2016.
 */

var express = require("express");

var router = express.Router();
var db = global.container.dataBase;

module.exports = router;

router.route("/songs")
    .get(function(req, res, next){
        db.getSongs(function(error, songList){
            if(error){
                return next(error);
            }
            res.send(songList);
            res.end();
        });
    })
    .post(function(req, res, next){
        if(!req.body.name || !req.body.text || !req.body.artistId){
            var error = new Error("Параметрами запроса должны быть name, text и artistId");
            error.status = 400;
            return next(error);
        }
        db.addSong(req.body.name, req.body.text, req.body.artistId, function(error, data){
            if(error){
                return next(error);
            }
            res.send({
                id: data.insertedId.toString()
            });
            res.end();
        });
    });


router.route("/songs/:id")
    .get(function(req, res, next) {
        db.getSong(req.params.id, function (error, song) {
            if (error) {
                return next(error);
            }
            db.getArtist(song[0].artistId, function (error, artist) {
                if (error) {
                    return next(error);
                }

                res.send({
                    name: song[0].name,
                    text: song[0].text,
                    artistId: artist[0].name
                });
                res.end();
            });

        });

    })
    .delete(function(req, res, next){
        db.removeSong(req.params.id,function(error) {
            if (error) {
                return next(error);
            }
            res.end();
        });
    });