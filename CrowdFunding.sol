pragma solidity >=0.4.22 <0.6.0;

contract CrowdFunding{
    mapping(address => uint) public contributors;
    address public admin;
    uint public noOfContributors;
    uint public minimumContributors;
    uint public deadline;
    uint public goal;
    uint public raisedAmount = 0;
    
    //the admin has to take vote from the contributors while spending the recieved from in funnd-raising
    struct Request{
        string description; //spending request description
        address payable recipient; //the account that recieves the money(supplier or something like that)
        uint value; //the value the recipient will recieve
        bool completed;
        uint noOfVoters;
        mapping(address => bool) voters;
    }
    
    Request[] public requests;
    
    event ContributeEvent(address sender, uint value);
    event CreateRequestEvent(string _description, address _recipient, uint _value);
    event makePaymentEvent(address recipient, uint value);
    
    
    constructor(uint _goal,uint _deadline) public {
        goal = _goal;
        deadline = now + _deadline;
        admin = msg.sender;
        minimumContributors =10;
    }
    
    modifier onlyAdmin(){
        require(msg.sender == admin);
        _;
    }
    
    function contribute() public payable{
        require(now < deadline);
        require(msg.value > minimumContributors);
        //We add this only if the user is contributing for the first time
         if(contributors[msg.sender] == 0){
             noOfContributors ++;
         }
         //we add this value to the existing value the contributor contributed
         contributors[msg.sender] += msg.value;
         raisedAmount += msg.value;
         
         emit ContributeEvent(msg.sender, msg.value);
    }
    
    function getBalance()public view returns(uint){
        return address(this).balance;
    }
    
    function getRefund()public payable{
        
        require(now > deadline);
        require(raisedAmount < goal);
        require(contributors[msg.sender] > 0);
        address payable recipient = msg.sender;
        uint value = contributors[msg.sender];
        recipient.transfer(value);
        contributors[msg.sender] = 0;
   }
   
   function createRequest(string memory _description,address payable _recipient,uint _value)public onlyAdmin{
       
       Request memory newRequest =  Request({
           description: _description,
           recipient: _recipient,
           value: _value,
           completed: false,
           noOfVoters:0
       });
       requests.push(newRequest);
       emit CreateRequestEvent(_description, _recipient, _value);
   }
   
   function voteRequest(uint _index)public{
       Request storage thisRequest = requests[_index];
       require(contributors[msg.sender] > 0);
       require(thisRequest.voters[msg.sender] == false);
       thisRequest.voters[msg.sender] = true;
       thisRequest.noOfVoters ++ ;
   }
   
   //makePayment function is for making payment to the supplier by the admin after contributors 
   //have voted and 50% of votes are true
   
   function makePayment(uint index)public payable onlyAdmin{
       Request  storage thisRequest = requests[index];
       require(thisRequest.completed == false);
       require(thisRequest.noOfVoters > noOfContributors/2);//more than 50% have voted
       thisRequest.recipient.transfer(thisRequest.value);
       thisRequest.completed = true;
       
       emit makePaymentEvent(thisRequest.recipient,     thisRequest.value);
   }
}