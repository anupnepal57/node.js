var express = require("express");
var router = express.Router();
var connection = require('./databaseconnection');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (username, password, done) {
    connection.query('select * from users where username = ? AND password = ?', [username, password], (err, result) => {
      if (err) return done(err);
      if (!result) return done(null, false, { message: "users not found" });
      return done(null, result)
    })
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  }
));

//Middleware
function requiresLogin(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/passport/login-page')
  }
  next();
}



router.get('/', (req, res) => {
  res.send({
    message: 'Successful loggedIn.',
    url: "/passport/logOut"
  })
})

router.get('/logout', (req, res) => {
  req.logOut();
  res.send({
    messagae: 'logged out'
  })
})



router.get('/dashboard', requiresLogin, (req, res) => {

  res.send(req.isAuthenticated() + "Welcome to your dashboard")
})


router.get('/dashboard-page',requiresLogin, (req, res) => {
console.log(req.isAuthenticated());
  res.render('index',{title: "Dashboard "});
})


router.get('/login-page',(req,res)=>{
  res.render('login');
}
  
)

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/passport/dashboard-page',
    failureRedirect: '404',
    failureFlash: true
  })
)



module.exports = router;