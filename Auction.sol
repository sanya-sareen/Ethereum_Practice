pragma solidity >=0.4.22 <0.6.0;
//Auction requires a start and end time
//It has an owner account who will start the auction and will get the bid money
//block.timestamp is not save to use cause they can be easily spoofed by the miners
//better to calcuate the time
contract Auction{
 address payable public  owner;
 uint public startBlock;
 uint public endBlock;
 //it will store the hash of the description of the product in blockchain and description in ipfs
 string public ipfsHash;
 
 enum State{Started, Running, Ended, Canceled}
 State public auctionState;
 
 //current highest bid
 //highest amount for bid
 uint public highestBindingBid;
 //we save the address of the highest bidder
 address payable public highestBidder;
 
 //amount of bids linked with account address
 mapping(address=>uint)public bids;
 uint bidIncrement;
 
 constructor() public {
     owner = msg.sender;
     startBlock = block.number;
     //auction valid for 1 week
     //604800(sec in a week)
     //604800/15 (15sec blocktime in ethereum)=40320
     endBlock = 40320;
     ipfsHash = '';
     bidIncrement = 10;
     auctionState = State.Running;
 }

 modifier onlyOwner(){
     require(msg.sender == owner);
     _;
     
 }
 modifier notOwner(){
     require(msg.sender != owner);
     _;
     
 }
modifier afterStart(){
     require(block.number >= startBlock);
     _;
     
 }
 modifier beforeEnd(){
    require(block.number <= endBlock);
     _;
 }
 
 function cancelAuction() public onlyOwner{
     auctionState = State.Canceled;
 }
 
//  bids[0x123...] = 40
//  bids[0xabc...] = 70
//  bidIncrement = 10
//  highestBidder = 0xabc...
//  =============================
//  0x123.. sends 15sec
//  Bids[ox123..] = 40+15 = 55
//  highestBindingBid = min(55+10,70) = 65
 
 //when the function doesn't read or write in blockchain we can declare that function as pure
 //this min()will run only inside the code
 function min(uint _value1,uint _value2 )pure internal returns(uint){
     if (_value1 <= _value2) {
     return _value1;    
     }
     else{
         return _value2;    
     }
     
 }
 
 function placeBid()public payable notOwner afterStart beforeEnd returns(bool){
    
 require(auctionState == State.Running);
 
 //require(msg.value > 0.01 ether);
 
 uint currentBid = bids[msg.sender] + msg.value;
 
 require(currentBid > highestBindingBid);
 bids[msg.sender] = currentBid;
 
 if(currentBid < bids[highestBidder]){
     
     highestBindingBid = min(currentBid + bidIncrement, bids[highestBidder]);
   }
 else {
     highestBindingBid = min(currentBid,bids[highestBidder]+ bidIncrement);
     highestBidder = msg.sender;
    }
  
 return true;
}

function finalizeAuction()public payable{
    //check if the auction has been ended or  not
    require(auctionState == State.Canceled || block.number > endBlock);
    // function should be called by the owner or the bids[msg.sender] should be 0
    
    require(msg.sender == owner || bids[msg.sender] >0 );
    //the address which recieves the funds
    address payable recipient;
    //the value which the address recieves
    uint value;
    //if the auction has been cancelled
    if(auctionState == State.Canceled){
        recipient = msg.sender;
        value = bids[msg.sender];
    }
    //the auction ended and owner recieves the highestBindingBid
    else if(msg.sender == owner){ 
        recipient = owner;
        value = highestBindingBid;
    }
    
    else if(msg.sender == highestBidder){
        recipient = highestBidder;
        value = bids[highestBidder] - highestBindingBid;
    }
    //this is not the owner nor the highestBidder
    else{
        recipient =  msg.sender;
        value = bids[msg.sender];
    }
    
    recipient.transfer(value);

    
}

    
}