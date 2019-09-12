'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json());
var coingate = require('coingate');

coingate.configure({
    mode: 'sandbox',
    app_id: '4832',
    api_key: 'nf6yIJMju0SG9qa8bKEPd7',
    api_secret: 'tLHQhwM3Y8jRuaivnc57Ve4zSyop9ADb'
})

var params = {

    order_id: 'ORDER-' + Math.floor(Math.random() * 100000000),
    price: 19,
    currency: 'USD',
    receive_currency: 'BTC',
    // callback_url:     'https://example.com/payments/callback?token=6tCENGUYI62ojkuzDPX7Jg',
    // cancel_url:       'https://example.com/cart',
    // success_url:      'https://example.com/account/orders',
    // description:      'Apple Iphone 10'
};

//                    tested

coingate.createOrder(params, function (err, res, body) {
    if (err) {
        console.log(err);
    } else {
        console.log('order created successfully');
        console.log(res.body);    
    }

});

// var orderID =51125437 ;

// coingate.getOrder(orderID, function (err, res, body) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('get order request successful');
//         console.log(res);
//     }
// });

// var params = {
//     per_page: 50,
//     page: 1,
//     sort: 'created_at_desc'
//     };
//     coingate.listOrders(params, function (err, res, body) {
//       if (err) {
//           console.log(err);
//       } else {
//           console.log('order listed successfully');
//           console.log(res.body);
//       }
//     });

