var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
app.use(cors())
app.use(bodyParser.json());
app.get('/customers', function (req, res) 
	{
		MongoClient.connect(url, function(err, db) {
	        if (err) throw err;
  	        var dbo = db.db("mydb");
  		dbo.createCollection("customers", function(err, res) {
    		if (err) throw err;
    		console.log("Collection created!");
    		db.close();
  	});
	})
 		res.send(req.body.customers);
   
	})

app.get('/', function (req, res)
 {
   res.send('Hello World');
   
})
app.post('/check', function (req, res)
 {
   res.send(req.body.check);
   
})
var server = app.listen(8081, function () 
{
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
})
