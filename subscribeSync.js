var Web3 = require('web3');
const net = require('net');
const web3 = new Web3('/home/sanya/.ethereum/geth.ipc', net, {});
var subscription = web3.eth.subscribe('syncing', function(error, sync){
    if (!error)
        console.log("sync "+sync);
});
// .on("data", function(sync){
//     // show some syncing stats
// })
// .on("changed", function(isSyncing){
//     if(isSyncing) {
//         // stop app operation
//     } else {
//         // regain app operation
//     }
// });

// unsubscribes the subscription
// subscription.unsubscribe(function(error, success){
//     if(success)
//         console.log('Successfully unsubscribed!');
// });