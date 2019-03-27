var express = require('express');
var router = express.Router();
var  connection = require('./databaseconnection');
router.get('/',function(req,res,next){
    connection.query('select * from todo',function(error,results,fields){
        if(error){
            throw error;
        }
        res.send(results)
    });
})
router.post('/',function(req,res,next){
    connection.query('insert into todo set ?',req.body,function(error,results,fields){
        if (error) throw error ;
        var createdId = results.insertedId;
        res.json({
             "id":createdId
        })
    })
})
router.delete('/:id',function(req,res){
    connection.query('delete from todo where id=?',req.params.id,function(err,results){
        if(err) throw err;
        results.message = 'deleted success';
        res.json(results);
    })
})
router.put('/:id',function(req,res){
    console.log("-----------------");
    console.log(req.body);
    console.log("-----------------");
    var myObj = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }
    var query = connection.query('update todo set ? where id=?',[myObj, req.params.id],function(err,results){
        if(err) throw err;
        res.json(results)
    })
    
})
 module.exports = router;