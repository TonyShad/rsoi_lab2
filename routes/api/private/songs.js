/**
 * Created by user on 25.01.2016.
 */

var express = require("express");
var defaultPageSize = 5;
var checkLogin = require("../../auth");
var router = express.Router();
var db = global.container.dataBase;

module.exports = router;

router.route("/songs")
    .get(checkLogin, function(req, res, next){
        var start = req.query.pageStart || 0;
        var pageSize = req.query.pageSize || defaultPageSize;
        db.getSongs(pageSize, start, function(error, songList){
            if(error){
                return next(error);
            }
            if(start == 0){
                db.getSongsCount(function(error, count){
                    if(error){
                        return next(error);
                    }
                    res.send({
                        songs: songList,
                        count: count
                    });
                    res.end();
                });
            }
            else{
                res.send({
                    songs: songList
                });
                res.end();
            }

        });
    })
    .post(checkLogin, function(req, res, next){
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
    .get(checkLogin, function(req, res, next) {
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
    .delete(checkLogin, function(req, res, next){
        db.removeSong(req.params.id,function(error) {
            if (error) {
                return next(error);
            }
            res.end();
        });
    });