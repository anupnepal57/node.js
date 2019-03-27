var express = require('express');
var router = express.Router();
var connection = require('./databaseconnection');
router.post('/register', function (req, res, next) {
    var clientRequest = {
        email: req.body.email,
        password: req.body.password
    };
    connection.query('insert into logintable set ?', clientRequest, function (error, result) {
        if (error) throw error;
        // res.redirect(301, '/logintable/' + result.insertId)
        req.session.userId = result.insertId
        res.redirect(301,'/current-user');
    });
});
router.get('/', function (req, res, next) {
    res.send('respond from resource');
});
router.get('/:userId', function (req, res) {
    var id = req.params.userId;
    var query =connection.query("select * from logintable where id =?", id, function (error, results) {
        if (error) throw error;
        
        var { id, email, isVerified } = results[0];
        res.json({
            id,
            email,
            isVerified
        });
        // res.send('askjdh');
    });
    // console.log(query.sql);
});
module.exports = router;