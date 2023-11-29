pragma solidity ^0.8.0;

import "./Wish.sol";
import "./Game.sol";

contract Player {
    string public name;
    address public wallet;
    Game public game;

    mapping(address => Wish) public wishes_map;  address[] public wishes_keys;
    
    constructor(address _wallet, string memory _name, Game _game) {
        wallet = _wallet;
        name = _name;
        game = _game;
    }

    function getName() public view returns (string memory)  {
        return name;
    }

    function getWallet() public view returns (address)  {
        return wallet;
    }

    function getSummary() public view returns (address, string memory, address, uint256) {
        return (
            address(this),
            name,
            wallet,
            address(this).balance
        );
    }

    function createWish(string memory _name, string memory _description, uint256 _targetAmount) public {
        (bool playerExists, Player aPlayer) = game.getPlayerByWallet(msg.sender);        
        require(playerExists, "Player does not exit.");

        Wish aWish = new Wish(_name, _description, _targetAmount, this);
        wishes_map[address(aWish)] = aWish;
        wishes_keys.push(address(aWish));
    }

    function listWishes() public view returns (Wish[] memory) {
        Wish[] memory wishes = new Wish[](wishes_keys.length);

        for(uint256 i = 0; i < wishes_keys.length; i++) {
            wishes[i] = wishes_map[wishes_keys[i]];
        }

        return wishes;   
    }

    function getWish(address anAddress) public view returns (bool, Wish) {
        Wish aWish = wishes_map[anAddress];

        if (address(aWish) != address(0)) {
            return (true, aWish);
        } else {
            return (false, Wish(address(0)));
        }
    }

}