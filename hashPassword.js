'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

var passwordHash = require('password-hash');
var hashedPassword = passwordHash.generate('password123');
// console.log(hashedPassword);
//var passwordHash = require('./lib/password-hash');
var hashedPassword = 'sha1$4fce612f$1$1b3489b48b91a32a91036aef398f7454725433b3';
console.log(passwordHash.isHashed('password123')); // false
console.log(passwordHash.isHashed(hashedPassword)); // true