var Web3 = require('web3');
const net = require('net');
const web3 = new Web3('/home/sanya/.ethereum/geth.ipc', net, {});
const subscription = web3.eth.subscribe('newBlockHeaders', function (error, result) {
    if (!error) {
        console.log(result);
        return;
    }
 console.error(error);
})
    .on("data", function (blockHeader) {
        console.log(blockHeader);
    })
    .on("error", console.error);


