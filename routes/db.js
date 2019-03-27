var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user :'root',
    password :'',
    database:'test'
  });

  connection.connect();
  router.get('/',function(req,res,next){
    connection.query('select * from item',function(error,results,fields){
        if(error){
          throw error;
        }
        res.send(results)
      });
  })
  router.get('/:id',function(req,res,next){
    var id = req.params.id
    connection.query('select * from `item` where `id` =? ',id,function(error,results,fields){
        if(error){
          throw error;
        }
        res.send(results)
      });
  })

  router.get('/status/:status',function(req,res,next){
    var status= req.params.status
    connection.query('select * from `item` where `status` =? ',status,function(error,results,fields){
        if(error){
          throw error;
        }
        res.send(results)
      });
  })



module.exports = router;