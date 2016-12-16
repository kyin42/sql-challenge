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
	    res.render("./index.ejs", {dbsuccess: true, results: data});
    })
    .catch(function (err) {
    	console.log("error form db: " + err);
      	res.render("./index.ejs", {dbsuccess: false});
    });
});

app.get('\/new', function (req, res) {
	res.render("./new.ejs");
});

app.post('\/new', function (req, res) {
	console.log(req.body.name + " " + req.body.content);
 	db.none('insert into posts(name, content)' +
      'values($1, $2)',
    req.body.name, req.body.content)
    .then(function () {
      res.redirect('/');
    })
    .catch(function (err) {
    	console.log("error form db: " + err);
      	res.render("./index.ejs", {dbsuccess: false});
    });
});

app.get('\/:id/edit', function (req, res) {
	db.one('select * from posts where id = $1', parseInt(req.params.id))
    .then(function (data) { 
	    res.render("./edit.ejs", {dbsuccess: true, results: data});
    })
    .catch(function (err) {
    	console.log("error form db: " + err);
      	res.render("./edit.ejs", {dbsuccess: false});
    });
});

app.post('\/:id/edit', function (req, res) {
	db.none('update posts set name=$1, content=$2 where id=$3',
    [req.body.name, req.body.content, parseInt(req.params.id)])
    .then(function () {
      res.redirect('/');
    })
    .catch(function (err) {
    	console.log("error form db: " + err);
      	res.render("./index.ejs", {dbsuccess: false});
    });
});

app.get('\/:id', function (req, res) {
	db.one('select * from posts where id = $1', parseInt(req.params.id))
    .then(function (data) { 
	    res.render("./single.ejs", {dbsuccess: true, results: data});
    })
    .catch(function (err) {
    	console.log("error form db: " + err);
      	res.render("./single.ejs", {dbsuccess: false});
    });
});







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
