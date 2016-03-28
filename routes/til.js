var express = require('express');
var router = express.Router();

var til = [];

/* READ all: GET til listing. */
router.get('/', function(req, res, next) {
  console.log(reg.cookies.username);
  var name = req.cookies.username || 'anonymous';
  req.db.driver.execQuery(
  "SELECT * FROM til;",
  function (err, data){
    if(err){console.log(err);}

    res.render('til/index', {title: 'Today I learned', til: til, name: name});
  }
);
});

/* CREATE entry form: GET /til/new */
router.get('/new', function(req, res, next) {
  res.render('til/new', {title: "Create new entry"});
});

/*CREATE entry: POST /til/ */
router.post('/', function(req, res, next) {
  req.db.driver.execQuery(
    "INSERT INTO til (slug,body) VALUES (?, ?);",
    [req.body.slug, req.body.body],
    function (err, data){
    if(err){console.log(err);}
    console.log(data);
  res.redirect(303, '/til/index');
    }
  );
});

/* UPDATE entry form: GET /til/1/edit */
router.get('/:id/edit', function(req, res, next) {
  req.db.driver.execQuery(
    'SELECT FROM * til WHERE id = ?;',
    [paarseInt(req.param.id)],
    function (err, data){
      if(err){console.log(err);}
  res.render('til/update',
  {
    title: 'Update an entry',
    til: data[0]
  });
  }
);
});

/* UPDATE entry: POST /til/1 */
router.post('/:id', function(req, res, next) {
  var id = parseInt(req.param.id);
  req.db.driver.execQuery(
    'UPDATE til SET slug = ?, body = ? WHERE id = ?;',
    [req.body.slug, req.body.body, parseInt(req.param.id)],
    function (err, data){
    if(err){console.log(err);}
  res.redirect(303, '/til/' + id);
  }
);
});

/* DELETE entry: GET /til/1/delete  */
router.get('/:id/delete', function(req, res, next) {
  req.db.driver.execQuery(
    'DELETE FROM til WHERE id = ?;',
    [parseInt(req.param.id)],
    function (err, data){
    if(err){console.log(err);}
  res.redirect(303, '/til/');
    }
  );
});

/* THIS NEEDS TO BE LAST or /new goes here rather than where it should */
/* READ one entry: GET /til/0 */
router.get('/:id', function(req, res, next) {
  req.db.driver.execQuery(
    'SELECT FROM til WHERE id = ?;',
    [parseInt(req.param.id)],
    function (err, data){
    if(err){console.log(err);}
  res.render('til/entry', {title: "a entry", til: data[0]});
    }
  );
});

module.exports = router;
