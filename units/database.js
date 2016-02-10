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
    };
    connection.collection('users').insertOne(user, done);
};

dataBase.getUser = function(name, done){
    connection.collection('users').findOne({name : name.toString()}, done);
};

dataBase.addApp = function(name, redirectURL, secret, user, done){
    var app;
    app = {
        "name": name,
        "redirectURL": redirectURL,
        "secret": secret,
        "ownerID": user
    };
    connection.collection('apps').insertOne(app, done);
};

dataBase.getApps = function(done){
    connection.collection('apps').find().toArray(done);
};

dataBase.getApp = function(id, done){
    connection.collection('apps').findOne({_id : ObjectId(id.toString())}, done);
}

dataBase.removeApp = function(id, done){
    connection.collection('apps').deleteOne({_id: ObjectId(id.toString())}, done);
};

module.exports = dataBase;