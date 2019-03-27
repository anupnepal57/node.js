var express = require('express');
var router = express.Router();
var connection = require ('./databaseconnection');
  router.get('/',function(req,res,next){
    connection.query('select * from category',function(error,results,fields){
        if(error){
          throw error;
        }
        res.send(results)
      });
  })
  router.post('/',function(req,res,next){
    connection.query('insert into category set ?',req.body, function(error,results,fields){
        if(error) throw error;
        var createId = results.insertedId;
        res.json({
             "message":'insert anything',
             "id":createId
        })
    })
})
router.delete('/:id',function(req,res){
    connection.query('delete from category where id=?',req.params.id,function(err,results){
        if(err) throw err;
        results.message = 'deleted success';
        res.json(results);
    })
})



  module.exports = router;