pragma solidity >=0.4.22 <0.6.0;
contract Myvoting
{
    struct Candidate
    {
        string name;
        uint voteCount;
    }
     struct Voter
    {
        bool authorized;
        bool voted;
        uint vote;
    }
    address public owner;//owner of the contract,the one who deploys the contract
    string public electionName;
    
    mapping(address=>Voter)public voters;
    
    Candidate[] public candidates;
    uint public totalVotes;
    
    modifier ownerOnly()
    {
        require(msg.sender==owner);
        _;
    }
    constructor (string memory _name)public
    {
        owner=msg.sender;//address of the user account
        electionName=_name;
    }
    function addCandidate(string memory _name) ownerOnly public
    {
        candidates.push(Candidate(_name,0));
    }
    
    function getNumCandidate()public view returns(uint)
    {
        return candidates.length;
    }
    function authorize(address _person)ownerOnly public 
    {
        voters[_person].authorized=true;
    }
    function vote(uint _voteIndex)public 
    {
        require(!voters[msg.sender].voted,"voter already voted");
        require(voters[msg.sender].authorized,"voter should be authorized");
        voters[msg.sender].vote=_voteIndex;
        voters[msg.sender].voted=true;
        
        candidates[_voteIndex].voteCount +=1;
        totalVotes +=1;
    }
    
     function winningProposal() public view returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < candidates.length; p++) 
        {
            if (candidates[p].voteCount > winningVoteCount) 
            {
                winningVoteCount = candidates[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() public view returns (string memory winnerName_)
    {
        winnerName_ = candidates[winningProposal()].name;
    }
}
    
    
    
    
    
    
    
    
    
    
    
    

    
