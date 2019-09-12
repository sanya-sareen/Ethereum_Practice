var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const net = require('net');
var Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');
app.use(cors());
app.use(bodyParser.json());
let input = fs.readFileSync('./solCompiled/votingContract.json');
input = JSON.parse(input);
const web3 = new Web3('/home/sanya/.ethereum/geth.ipc', net, {});
const contractAbi = input.contracts['votingContract.sol:Myvoting'].abi;
console.log(contractAbi);
var address = "0x47A3F054ad84290a28e03225bdDCbD504Fa96Fea";
const votingContract = new web3.eth.Contract(JSON.parse(contractAbi), address);//newContractInstance
app.post('/addCandidate',  function (req, res) {
    var myobj=req.body.name;
    
     web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 600);//unlocking the account
            
         votingContract.methods.addCandidate(myobj).send(
            { from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f'  })
            .on('transactionHash', (hash) => {
               
                console.log(hash)
            })

            res.send(myobj);
    }); 

app.put('/no_of_candidates', async function (req, res) 
	{web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 600);//unlocking the account
        var total;
      const take = await votingContract.methods.getNumCandidate().call({ from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f' },
                function (error, result) 
                {
                   if (!error)
                   {   total=result;
                       console.log("No.of Candidates -" + result)
                   }
            })
  	res.send("list  "+total);
       })

       app.get('/authorizeAddress', async function (req, res) 
       {web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 600);//unlocking the account
           var total01;
          total01=await votingContract.methods.authorize('0x6265833bd688a0c2aef2f87b633f53e1d280223f').send(
            { from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f'  })
            .on('transactionHash', (hash) => {
                console.log("Authorize hash -"+hash)
            });
         res.send("hash - "+total0);
          })

           app.post('/Vote', function (req, res) {
            var myObjVote=req.body.vote;
              web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 600);
            
              votingContract.methods.vote(myObjVote).send(
                { from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f'  })
                .on('transactionHash', (hash) => {
                    console.log("vote hash -"+hash)
                });
                 res.send(myObjVote);
            }); 


            app.get('/Winner', async function (req, res) 
	{web3.eth.personal.unlockAccount("0x6265833bd688a0c2aef2f87b633f53e1d280223f", "apple", 600);//unlocking the account
        var total;
       total = await votingContract.methods.winningProposal().call({ from: '0x6265833bd688a0c2aef2f87b633f53e1d280223f' },
      function (error, result) 
      {
         if (!error)
         {
             console.log("Winner -" + result)
             total=result;
         }
         res.send("Winner"+result);
     });
  })





   


       
























app.post('/check', function (req, res)
 {
   res.send(req.body.check);
   
})
var server = app.listen(8081, function () 
{
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
})
