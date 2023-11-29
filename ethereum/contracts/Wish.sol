pragma solidity ^0.8.0;
import "./Player.sol";

contract Wish {
    string public title;
    string public description;
    uint256 public targetAmount;
    Player public player;
    mapping(address => Contributor) public contributors_map; address[] public contributors_keys;

    struct Contributor {
        Player player;
        uint256 numberOfContributions;
        uint256 totalAmountContributed;
    }

    constructor(string memory _title, string memory _description, uint256 _targetAmount, Player _player) {
        title = _title;
        description = _description;
        targetAmount = _targetAmount;
        player = _player;
    }

    function getTitle() public view returns (string memory)  {
        return title;
    }

    function getDescription() public view returns (string memory)  {
        return description;
    }

    function getSummary() public view returns (string memory, string memory, uint256, address, uint256) {
        return (
            title,
            description,
            targetAmount,
            address(player),
            address(this).balance
        );
    }

    function contribute(Player player) external payable {
        require(msg.value > 0, "Contribution amount must be greater than 0");
        
        Contributor memory aContributor = contributors_map[address(player)];

        if (address(aContributor.player) == address(0)) {
            contributors_keys.push(address(player));
        }

        contributors_map[address(player)].player = player;
        contributors_map[address(player)].numberOfContributions += 1;
        contributors_map[address(player)].totalAmountContributed += msg.value;

    }

    function listContributors() public view returns (Contributor[] memory) {
        Contributor[] memory contributors = new Contributor[](contributors_keys.length);

        for(uint256 i = 0; i < contributors_keys.length; i++) {
            contributors[i] = contributors_map[contributors_keys[i]];
        }

        return contributors;   
    }

}