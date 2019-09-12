var Web3 = require('web3');
const net = require('net');
const solc = require('solc');
const fs = require('fs');

let input = fs.readFileSync('./solCompiled/votingContract.json');
input = JSON.parse(input);
const web3 = new Web3('/home/sanya/.ethereum/geth.ipc', net, {});
const contractAbi = input.contracts['votingContract.sol:Myvoting'].abi;
console.log(contractAbi);
var address = "0x47A3F054ad84290a28e03225bdDCbD504Fa96Fea";
const votingContract = new web3.eth.Contract(JSON.parse(contractAbi), address);//newContractInstance
web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 600);//unlocking the account

    votingContract.methods.addCandidate('microsoft').estimateGas({
    gas: 5000000
}, function (error, gasAmount) {
    console.log(gasAmount);

    web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 600);//unlocking the account

    });
    
    votingContract.methods.addCandidate('microsoft').send(
        { from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f'},)
        .on('transactionHash', (hash) => {
            console.log(hash)
        })

        votingContract.methods.getNumCandidate().call({ from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f' },
        function (error, result) 
        {
           if (!error)
               console.log("No.of Candidates -" + result)
    });
    votingContract.methods.authorize('0x6265833bd688a0c2aef2f87b633f53e1d280223f').send(
        { from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f'  })
        .on('transactionHash', (hash) => {
            console.log("Authorize hash -"+hash)
        });
        votingContract.methods.vote('1').send(
            { from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f'  })
            .on('transactionHash', (hash) => {
                console.log("vote hash -"+hash)
            });
               
            votingContract.methods.winningProposal().call({ from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f' },
        function (error, result) 
        {
           if (!error)
               console.log("Winner -" + result)
    });
    




