// Put in your express server here. Use index.html for your
// view so have the server direct you to that.
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

var ejs = require('ejs');

app.use(express.static(__dirname + '/views'));
app.set('view engine', ejs);
app.set('views', __dirname+'/views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

/*
module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy
};*/

/*
function getAllPuppies(req, res, next) {
  db.any('select * from pups')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}*/

/*
router.get('/api/puppies', db.getAllPuppies);
router.get('/api/puppies/:id', db.getSinglePuppy);
router.post('/api/puppies', db.createPuppy);
router.put('/api/puppies/:id', db.updatePuppy);
router.delete('/api/puppies/:id', db.removePuppy);
*/



app.get('\/((index\.html)?)', function (req, res) {
	db.any('select * from posts')
    .then(function (data) {
    	console.log("success");
	    res.render("./index.ejs", {dbsuccess: true, results: data});
    })
    .catch(function (err) {
    	console.log("error form db: " +err)
      	res.render("./index.ejs", {dbsuccess: false});
    });
});

//var pg = require('pg');
/*
app.get('/db', function (req, res) {
  response.render("./index.ejs");
	console.log(process.env.DATABASE_URL);
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM posts', function(err, result) {
      done();
    	console.log(result.rows[0]);
      if (err)
       { console.error(err); response.send("Error from db " + err); }
      else
       { 
  response.render("./index.html");response.send("/db.html", {results: result.rows}); 
}
    });
  });
});*/

app.get('/css/:path', function (req, res) {
  res.sendFile(__dirname + '/css/' + req.params.path);
});

app.get('/js/:path', function (req, res) {
  res.sendFile(__dirname + '/js/' + req.params.path);
});
app.get('/images/:path', function (req, res) {
  res.sendFile(__dirname + '/images/' + req.params.path);
});

app.use(function (req, res, next) {
  res.status(404).send('404! Not found.')
})

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});
