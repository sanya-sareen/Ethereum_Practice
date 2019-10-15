'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json());
var coingate = require('coingate');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

coingate.configure({
    mode: 'sandbox',
    app_id: '4832',
    api_key: 'nf6yIJMju0SG9qa8bKEPd7',
    api_secret: 'tLHQhwM3Y8jRuaivnc57Ve4zSyop9ADb'
})
//Collection created under mydb
app.get('/createDB', function (req, response) {
    MongoClient.connect(url, { useNewUrlParser: true },function (err, db) {
        if (err) throw err;
        //name of the database is mydb
        var dbo = db.db("mydb");
        //name of the collection is cryptoTransaction
        dbo.createCollection("cryptoTransaction", function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
            response.send("Database created!")
        });
    });
});
//Make Payment in Bitcoin 
app.post('/cryptoPayment', function (req, response) {
    var params = {
        order_id: 'ORDER-' + Math.floor(Math.random() * 100000000),
        price: req.body.price_amount,
        currency: 'USD',
        receive_currency: 'BTC',
        // callback_url:     'https://example.com/payments/callback?token=6tCENGUYI62ojkuzDPX7Jg',
        // cancel_url:       'https://example.com/cart',
        // success_url:      'https://example.com/account/orders',
        // description:      'Apple Iphone 10'
           callback_url :     "http://localhost:8081/acceptCallback"
    };
    coingate.createOrder(params, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log('order created successfully');
            console.log(res.body);
            response.send(res.body);
        }
    });
});

app.get('/acceptCallback', cors(), function (req, res) {
    //  console.log("Data receieved"+ req.body)
    res.send("success")
});

//order status by order ID

app.post('/orderStatus', function (req, response) {
    var orderID = req.body.orderID;
    coingate.getOrder(orderID, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log('get order request successful');
            console.log(res);
            response.send(res.body.status);
        }
    });
});
//Transaction history
app.get('/transactionList', function (req, response) {
    var params = {
        per_page: 50,
        page: 1,
        sort: 'created_at_desc'
    };
    coingate.listOrders(params, function (err, resp, body) {
        if (err) {
            console.log(err);
        } else {
            console.log('order listed successfully');
            //console.log(res.body);
            MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                var myobj = resp.body;
                //console.log(myobj);
                dbo.collection("cryptoTransaction").insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    //console.log("1 document inserted");
                    console.log(myobj);

                    response.send(myobj);
                    db.close();
                });
            });
        }
    });
});

//Delete collection
app.get('/deleteCollection',function(req,res){
    MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myquery = { "current_page":1}
        //dbo.collection("cryptoTransaction").deleteMany(myquery, function(err, obj)
        dbo.collection("cryptoTransaction").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log(obj.result.n + " document(s) deleted");
          res.send('deleted');
          db.close();
        });
      });
    
})

// Transaction details by => status": "paid"

app.get('/statusPaid', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("cryptoTransaction").aggregate([{ $unwind: "$orders" },
        { $match: { "orders.status": "paid" } },
        {
            $group: {
                _id: "$orders.status",
                cryptoTransaction: {
                    $push:
                    {
                        status: "$orders.status",
                        btc_amount: "$orders.btc_amount",
                        bitcoin_address: "$orders.bitcoin_address",
                        order_id: "$orders.order_id",
                        payment_url: "$orders.payment_url"
                    }
                }
            }
        }]).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});

// Transaction details by => status": "invalid"

app.get('/statusInvalid', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("cryptoTransaction").aggregate([{ $unwind: "$orders" },
        { $match: { "orders.status": "invalid" } },
        {
            $group: {
                _id: "$orders.status",
                cryptoTransaction: {
                    $push:
                    {
                        status: "$orders.status",
                        btc_amount: "$orders.btc_amount",
                        bitcoin_address: "$orders.bitcoin_address",
                        order_id: "$orders.order_id",
                        payment_url: "$orders.payment_url"
                    }
                }
            }
        }]).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});

// Transaction details by => status": "expired"

app.get('/statusExpired', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("cryptoTransaction").aggregate([{ $unwind: "$orders" },
        { $match: { "orders.status": "expired" } },
        {
            $group: {
                _id: "$orders.status",
                cryptoTransaction: {
                    $push:
                    {
                        status: "$orders.status",
                        btc_amount: "$orders.btc_amount",
                        bitcoin_address: "$orders.bitcoin_address",
                        order_id: "$orders.order_id",
                        payment_url: "$orders.payment_url"
                    }
                }
            }
        }]).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});

//Total amount recieved in bitcoin

app.get('/amntInBitcoin', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = { status: req.body.status };
        dbo.collection("cryptoTransaction").aggregate([
            { $unwind: "$orders" },
            { $match: { "orders.status": "paid" } },
            { $group: { _id: "$orders.status", cryptoTransaction: { $sum: { $toDecimal: "$orders.btc_amount" } } } }
        ]).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});

//Total amount recieved in fiat currencies(this amount will come authorize.net)
//for sample usage calculating the amount from cryptoTransaction

app.get('/amntInFiat', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("cryptoTransaction").aggregate([{ $unwind: "$orders" },
        { $match: { "orders.status": "paid" } },
        { $group: { _id: "$orders.status", cryptoTransaction: { $sum: { $toDecimal: "$orders.price" } } } }
        ]).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});

// List only 5 transaction
// db.cryptoTransaction.find({ "orders.currency": "USD" }, { "orders": { $slice: 5 } }).pretty();

app.get('/fiveTrnx', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("cryptoTransaction").find({ "orders.currency": "USD" }, { "orders": { $slice: 5 } }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});

var server = app.listen(8081, function () {
	var host = server.address().address
    var port = server.address().port
   	console.log("Example app listening at http://%s:%s", host, port)
})