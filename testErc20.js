var Web3 = require('web3');
const net = require('net');
const solc = require('solc');
const fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
let input = fs.readFileSync('./solCompiled/ErcToken.json');
input = JSON.parse(input);
const web3 = new Web3('/home/sanya/.ethereum/geth.ipc', net, {});
const contractAbi = input.contracts['ErcToken.sol:FICOSToken'].abi;
var address = "0xEC73EDF9377aCfD58e28339e063a40878E88e5fb";
const ErcToken = new web3.eth.Contract(JSON.parse(contractAbi), address);//newContractInstance

app.get('/tokensAvailabe',async function (req, res) {
    
     await ErcToken.methods.totalSupply().estimateGas({ gas: 5000000 }, function (error, gasAmount) {
      console.log("Gas Estimate is " + gasAmount);
         ErcToken.methods.totalSupply().call({ from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f',gas: gasAmount},function (error, result) {
                if (!error)
                {       console.log( +result)
                    console.log("Total Supply-" + result)
                    
                    res.send({"supply":+result });
                }
                    else{
                        console.log(error)
                    }
                    
            });
    });
});

app.post('/transferCoins', async function (req, res) {
    web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 1000);
    await ErcToken.methods.transfer(req.body.Account, req.body.Tokens).send(
        { from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f' }).on('transactionHash', (hash) => {
            console.log("hash of transfer " + hash)
            res.send({ "hash": hash });

        });
});

                   //tested

// web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 1000);
// ErcToken.methods.transfer("0x49f513854af455f45044b12869ebb1dec9db3073", 20).send(
//     { from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f' }).on('transactionHash', (hash) => {
//         console.log("hash of transfer " + hash)
//     });

// web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 600);
// ErcToken.methods.approve('0x49f513854af455f45044b12869ebb1dec9db3073', 50).send(
//     { from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f' })
//     .on('transactionHash', (hash) => {
//         console.log("Approved " + hash)
//     });

// app.get('/balance',async function (req, res) {
//     await ErcToken.methods.balanceOf('0x6265833bd688a0c2aef2f87b633f53e1d280223f').call({ from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f' },
//         function (error, result) {
//             if (!error)
//             {
//                 console.log("balance " + result)
//                 res.send({ "hash": hash });
//             }
//             else
//             {
//                 console.log(error)
//             }
//         });
// });

// ErcToken.methods.balanceOf('0x6265833bd688a0c2aef2f87b633f53e1d280223f')
//     .call({ from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f' },
//         function (error, result) {
//             if (!error)
//                 console.log("balance " + result)
//         });

// ErcToken.methods.allowance('0x6265833bd688a0c2aef2f87b633f53e1d280223f', '0x49f513854af455f45044b12869ebb1dec9db3073')
//     .call({ from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f' },
//         function (error, result) {
//             if (!error)
//                 console.log("Allowance" + result)
//         });

// ErcToken.methods.transferFrom('0x6265833bd688a0c2aef2f87b633f53e1d280223f', '0x49f513854af455f45044b12869ebb1dec9db3073', 50)
//     .estimateGas({ gas: 8000000, from: "0x49f513854af455f45044b12869ebb1dec9db3073" },
//         function (error, gasAmount) {
//             console.log("Gas Estimate is " + gasAmount);
//             web3.eth.personal.unlockAccount("0x49f513854af455f45044b12869ebb1dec9db3073", "apple", 600);//unlocking the account
//             ErcToken.methods.transferFrom('0x6265833bd688a0c2aef2f87b633f53e1d280223f', '0x49f513854af455f45044b12869ebb1dec9db3073', 50)
//                 .send(
//                     { from: '0x49f513854af455f45044b12869ebb1dec9db3073', gas: gasAmount })
//                 .on('transactionHash', (hash) => {
//                     console.log("hash of transfer from " + hash)
//                 });

//         });

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})


