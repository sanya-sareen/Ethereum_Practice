pragma solidity >=0.4.22 <0.6.0;

contract TransferMap
{ 

    mapping(address=>uint256)private balance;
    
    function deposit()public payable{
        balance[msg.sender] += msg.value;
    }


    function get() view public returns(uint256)
    {
     return (balance[msg.sender]);
    }
}                                                                       