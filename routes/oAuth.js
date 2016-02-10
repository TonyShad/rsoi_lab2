/**
 * Created by user on 08.02.2016.
 */
module.exports = function(req, res, next){
    req.oAuth = {};

    if(req.session.user){
        req.oAuth.user = req.session.user;
    }

    next();
};
