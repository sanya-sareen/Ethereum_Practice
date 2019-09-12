






async function fun1(req, res){
  let response = await request.get('http://localhost:3000');
    if (response.err) { console.log('error');}
    else { console.log('fetched response');
}

async function fun1(){

let res= await votingContract.methods.getNumCandidate().call({ from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f' },
        function (response.error, response.result) 
        {
           if (!error)
               console.log("No.of Candidates -" + result)
    });



async function(){
let candidates = await votingContract.methods.addCandidate('microsoft').estimateGas({
    gas: 5000000
}, function (error, gasAmount) {

    console.log(gasAmount);

    web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 600);//unlocking the account

    votingContract.methods.addCandidate('microsoft').send(
        { from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f'  })
        .on('transactionHash', (hash) => {
            console.log(hash)
        })

}

votingContract.methods.addCandidate('microsoft').estimateGas({
    gas: 5000000
}, function (error, gasAmount) {
    console.log(gasAmount);

    web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 600);//unlocking the account

    votingContract.methods.addCandidate('microsoft').send(
        { from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f'  })
        .on('transactionHash', (hash) => {
            console.log(hash)
        })

        









