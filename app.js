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

var pg = require('pg');

app.get('\/((index\.html)?)', function (req, res) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done){
		client.query('SELECT * FROM posts',function(err, result){
			done();
			if(err){
				console.error(err);
				res.render("./index.ejs", {dbsuccess: false});
			} else{
  				res.render("./index.ejs", {dbsuccess: true,results: result.rows});
			}
		});
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
