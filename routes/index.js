var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Today I Learned' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login - Today I Learned' });
});

router.post('/login', function(req, res, next) {

  req.db.driver.execQuery(
    'SELECT * FROM users WHERE email=?;',
    [req.body.email],
    function(err, data){
      if(err)
      {
        console.log(err);
      }

      if(req.body.password == data[0].password) //DONT Do this is other projects!!!
      {
        res.cookie('username', data[0].name);
        res.redirect('/til/');
      }
      else
      {
        res.redirect('/login');
      }
    }
  );
});

router.get('/logout', function(req, res){
  res.clearCookie('username');
  res.redirect("/");
});

module.exports = router;
