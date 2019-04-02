var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'budgetcalculater'
});
var test = require('./budgetcalulater');

test.logger('Logger her');
connection.connect();
router.get('/', function (req, res, next) {
    connection.query('select * from income', function (error, result, fields) {
        if (error) throw error
         res.send(result)

    })
});
router.get('/income/:id', function (req, res) {
    var id = req.params.id;
    connection.query('select * from income where id = ?', id, function (err, results) {
        if (err) throw err;
        res.send(results)
    });
});
router.post('/', function (req, res) {
    var postObject = {
        title: req.body.title,
        price: req.body.price
    }
    connection.query('insert into income set ?', postObject, function (error, results, fields) {
        if (error) throw error;
        res.redirect(301, '/budget/income/' + results.insertId)
    });
});
router.put('/:id',function(req,res){
    var putObject={
        title:req.body.title,
        price: req.body.price
    }
    connection.query('update income set ? where id =?',[putObject,req.params.id],function(err,result){
        if (err) throw err;
    
        res.redirect(303,'/budget/income/'+ req.params.id);
    });
});
router.delete('/id',function(req,res){
    connection.query('delete from income where id=?', req.params.id, function (err, results) {
        if (err) throw err;
        results.message = 'deleted success';
        res.json(results);
    })
})
module.exports = router;