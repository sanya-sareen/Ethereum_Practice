var Web3 = require("web3");
const net = require('net');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const web3 = new Web3('/home/sanya/.ethereum/geth.ipc', net, {});
app.post('/login', async function (req, res) {
    var accountDetail;
    var accInfo;
    accountDetail = await web3.eth.personal.newAccount(req.body.password, function (error, result) {
        if (!error) {
            console.log(result)
            accInfo = result;
            res.send({ "account ": accInfo });

        }
        else {
            console.log(error)
        }
    });
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

