/**
 * Created by user on 25.01.2016.
 */

var dataBase = {};
var connection;
var debug = require('debug')("rsoi_lab2:database")
var client = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var bcrypt = require('bcrypt');

dataBase.connect = function(connectionString, done){
    client.connect(connectionString, function(error, db){
        if(error){
            return done(error);
        }
        connection = db;
        done(null);
    });
};
dataBase.addSong = function(name, text, artistId, done){
    var song;
    song = {
         "name": name,
         "text": text,
         "artistId": artistId
    };
    connection.collection('songs').insertOne(song, done);

};

dataBase.getSongs = function(done){
    connection.collection('songs').find().map(function(song){
        return {
            _id: song._id,
            name: song.name
        };
    }).toArray(done);

};

dataBase.getSong = function(id, done){
    connection.collection('songs').find({_id : ObjectId(id.toString())}).toArray(done);
};

dataBase.getArtist = function(id, done){
    connection.collection('artists').find({_id : ObjectId(id.toString())}).toArray(done);
};

dataBase.addArtist = function(name, done){
    var artist;
    artist = {
        "name" : name
    };
    connection.collection('artists').insertOne(artist, done);
};

dataBase.getArtists = function(done){
    connection.collection('artists').find().toArray(done);
};



dataBase.removeArtist = function(id, done){
    connection.collection('artists').deleteOne({_id: ObjectId(id.toString())}, done);
};

dataBase.removeSong = function(id, done){
    connection.collection('songs').deleteOne({_id: ObjectId(id.toString())}, done);
};


dataBase.addUser = function(name, passwordDigest, done){
    var user;
    user = {
        "name": name,
        "passwordDigest": passwordDigest
    }
    connection.collection('users').insertOne(user, done);
};

dataBase.signUser = function(name, passwordDigest, done){
    connection.collection('users').find({name : name.toString()}).toArray(function(error, user){
        if(error){
            return next(error);
        }
        if(user.passwordDigest == passwordDigest){
            return next("OK");
        }
    });
};

module.exports = dataBase;