/**
 * Created by user on 25.01.2016.
 */
var express = require("express");

var router = express.Router();

router.get("/stats", function(req, res, next){
    res.send("OK");
    res.end;
});


module.exports = router;