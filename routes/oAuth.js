/**
 * Created by user on 08.02.2016.
 */
var db = global.container.dataBase;
module.exports = function(req, res, next){
    req.oAuth = {};

    if(req.session.user){
        req.oAuth.user = req.session.user;
        return next();
    }
    if(req.headers.authorization){
        db.getToken(req.headers.authorization, function(error, token){
            if(error){
                return next(error);
            }
            req.oAuth.user = token.userId;
            next();
        });

    }
    else{
        next();
    }

};
