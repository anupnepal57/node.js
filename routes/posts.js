var express = require('express');
var router = express.Router();
var connection = require('./databaseconnection');
const { check, validationResult } = require('express-validator/check');
router.get('/', function (req, res, next) {
    connection.query('select * from posts', function (error, results, fields) {
        if (error) {
            throw error;
        }
        res.send(results)
    });
})
router.get('/:id',function(req,res){
    var id = req.params.id;
    connection.query('select * from posts where id = ?',id,function(err,results){
        if(err) throw err;
        res.send(results)
        
    })
})
router.post('/', [
    check('title').isLength({ min: 2, max: 10 }),
    check('email').isEmail(),
    check('description').isLength({ min: 2, max: 10 })
], function (req, res) {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json(errors.array());
    } else {
        connection.query('insert into posts set ?', req.body, function (error, results, fields) {
            if (error) throw error;
            // var createId = results.insertedId;
            // res.json({
            //     "message": 'insert anything',
            //     "id": createId
            // })
            res.redirect(301,'/posts/'+ results.insertId)
        })
    }



})
router.delete('/:id', function (req, res) {
    connection.query('delete from posts where id=?', req.params.id, function (err, results) {
        if (err) throw err;
        results.message = 'deleted success';
        res.json(results);
        
    })
})
router.put('/update/:id', function (req, res) {
    console.log("-----------------");
    console.log(req.body);
    console.log("-----------------");
    var myObj = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }
    var query = connection.query('update posts set ? where id=?', [myObj, req.params.id], function (err, results) {
        if (err) throw err;
        // results.message='updated';
        // res.json(results)
        res.redirect(303,'/posts/'+ req.params.id);
    })
    //Prints the sql statment
    // console.log(query.sql);
})
module.exports = router;