var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var utils = require('util');
var passSalt = '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa';

var db = global.container.dataBase;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.route('/signup')
    .post(function(req, res, next){
        if(!req.body.name || !req.body.password){
          var error = new Error("Поля имя пользователя и пароль не могут быть пустыми");
          error.status = 400;
          return next(error);
        }
        var passwordDigest = bcrypt.hashSync(req.body.password, passSalt);
        db.addUser(req.body.name, passwordDigest, function(error, data){
            if(error){
                if(error.code === 11000){
                    res.statusCode = 400;
                    res.send("Пользователь с таким именем уже существует");
                    return res.end();
                }
                return next(error);
            }
            res.send({
                id: data.insertedId.toString()
            });
            res.end();
        });
    });

router.route('/signinuser')
    .get(function(req, res, next){
        if(!req.query.name || !req.query.password){
            var error = new Error("Введите имя пользователя и пароль");
            error.status = 400;
            return next(error);
        }
        db.getUser(req.query.name, function(error, user){
            if(error){
                return next(error);
            }
            if(!user){
                var error = new Error("User Not Found");
                error.status = 404;
                return next(error);
            }
            bcrypt.compare(req.query.password, user.passwordDigest, function(err, match){
                if(err){
                    return next(err);
                }
                if(!match){
                    var error = new Error("Invalid password");
                    error.status = 401;
                    return next(error);
                }

                req.session.user = user._id.toString();

                if(req.query.app_name && req.query.redirect_uri && req.query.client_id){
                    var url = utils.format('/agreements?%s',req.originalUrl.split('?')[1]);
                    console.log(url);
                    res.send({
                        url: url
                    });
                    return;
                }
                res.end();
            });

        });
    });

router.route('/logout')
    .get(function(req, res, next){
        req.session.destroy();
        res.redirect("/signin");
    });

module.exports = router;
