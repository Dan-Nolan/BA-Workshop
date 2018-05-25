pragma solidity ^0.4.24;

contract ChuckETHCheese {
    uint public pizzas;
    bool public isPizzaHot;
    address owner;
    mapping(address => uint) public tokenBalances;
    mapping(address => bool) public playingStatus;

    constructor(uint _pizzas) public {
        pizzas = _pizzas;
        owner = msg.sender;
    }

    function setIsPizzaHot(bool _isPizzaHot) public {
        isPizzaHot = _isPizzaHot;
    }

    function purchaseTokens() public payable {
        uint tokens = msg.value;
        tokenBalances[msg.sender] += tokens;
    }

    function playGame() public {
        require(tokenBalances[msg.sender] >= 1);
        tokenBalances[msg.sender] -= 1;
        playingStatus[msg.sender] = true;
    }

    function awardWinner(address winner) public onlyOwner {
        winner.transfer(1);
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}
