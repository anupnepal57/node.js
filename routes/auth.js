var express = require('express');
var router = express.Router();
var connection = require('./databaseconnection');
router.get('/current-user',function(req,res){
    if(!req.session.userId)return res.status(401).send('please.login')
    connection.query("select * from logintable where id = ?", req.session.userId,function(err,result){
          if(err)throw err;
          var{id,email,isVerified}= result[0];
          res.json({id,email,isVerified});
      }
    )
})
router.post('/login',function(req,res,next){
    var credentials ={
         email:req.body.email,
         password: req.body.password
    };
    console.log(req.session);
    connection.query("select * from logintable where email = ? and password=?",
    [credentials.email,credentials.password],function(error,result){
        if(error)throw error;
        console.log(result[0].id)
        req.session.userId = result[0].id;
        res.redirect(301,'/current-user');
        // res.json(result);
    });
});     
module.exports = router;