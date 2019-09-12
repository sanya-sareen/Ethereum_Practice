var express = require('express');
var app = express();
 var bodyParser = require('body-parser');
 var cors = require('cors');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(cors())
app.use(bodyParser.json());

app.get('/customers', function (req, res) {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { address: "Park Lane 38" };
  dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
})
   res.send(req.body.customers);
   
})





var server = app.listen(8081, function () {
   var host = server.address().address
