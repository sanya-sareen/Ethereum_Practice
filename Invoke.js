var Web3 = require('web3');
const net = require('net');
const solc = require('solc');
const fs = require('fs');

let input = fs.readFileSync('./solCompiled/contract1.json');
input = JSON.parse(input);
const web3 = new Web3('/home/sanya/.ethereum/geth.ipc', net, {});
const contractAbi = input.contracts['contract1.sol:TransferMap'].abi;
console.log(contractAbi);
var address = "0xb538781970aC02D59EE56F1Dc4Cc24E5aB1f00A0";
const contract1 = new web3.eth.Contract(JSON.parse(contractAbi), address);//newContractInstance
web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 600);//unlocking the account

contract1.methods.deposit().estimateGas({
    gas: 5000000
}, function (error, gasAmount) {
    console.log(gasAmount);

    web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 600);//unlocking the account

    contract1.methods.deposit().send({ from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f', value: web3.utils.toWei("5", "ether") })
        .on('transactionHash', (hash) => {
            console.log(hash)
            contract1.methods.get().call({from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f'}, function(error, result) {
                if(!error)
                console.log("result"+result)
    
                //console.log(error)
                
             });
        })
})







