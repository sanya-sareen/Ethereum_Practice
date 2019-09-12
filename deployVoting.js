var Web3 = require('web3');
const net = require('net');
const solc = require('solc');
const fs = require('fs');
const input = fs.readFileSync('../ethereum/node01/contracts/votingContract.sol');
const output = solc.compile(input.toString(), 1);
const web3 = new Web3('/home/sanya/.ethereum/geth.ipc', net, {});
const contractAbi = output.contracts[':Myvoting'].interface;
const votingContract = new web3.eth.Contract(JSON.parse(contractAbi));
web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 600);
console.log(output.contracts[':Myvoting'].bytecode)
votingContract.deploy({
    data:'0x'+ output.contracts[':Myvoting'].bytecode,
    arguments: ['My String']
     })
    //  .estimateGas((err, gas) => {
    //     console.log("\nGAS Required"+gas);
    // })
 .send({
        from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f',
        gas: '6700000',
  })
  
 .on('error', (error) => { console.log(error) })
 .then((newContractInstance) => 
    {
     console.log("contract deployed")
     console.log(newContractInstance.options.address) // instance with the new contract address
    });

    
    