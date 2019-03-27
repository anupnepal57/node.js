var express = require('express');
var route = express.Router();
var connection = require('./databaseconnection')
route.get('/',function(req,res,next){
    res.render('test',{
        title:"test page",
        description:"jjjjjjjjjj"
    })
});
route.post('/db',function(req,res,next){
    var myObj={
        name: req.body.name || "not inserted",
        description:req.body.description,
        status: req.body.status|| 0
    }
    connection.querry('insert into items set ?',myObj, function(error,results,fields){
        if(error) throw error;
        var createId = results.insertedId;
        res.json({
             "message":'insert anything',
             "id":createId
        })
    }
    )
})
module.exports = route;