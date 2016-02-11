/**
 * Created by user on 11.02.2016.
 */
module.exports = function(req, res, next) {
    if (req.oAuth.user) {
        return next();
    }
    else {
        var error = new Error("User unauthorised");
        error.status = 400;
        return next(error);
    }
};