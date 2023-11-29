pragma solidity ^0.8.0;

import "./Player.sol";
import "./Game.sol";

contract Group  {
    mapping(address => Player) public players_wallet_map;  address[] public players_wallet_keys;

    string public name;
    Player public manager;
    Meeting[] public meetings;
    Game public game;

    struct GeoLocation {
        string latitude;
        string longitude;
    }

    struct Meeting {
        uint256 id;
        address creatorWallet;
        uint256 date;
        address[] membersPresent;
        GeoLocation geoLocation;
    }
    
    constructor (Player creator, string memory nameParam, Game _game) {
        manager = creator;
        name = nameParam;
        game = _game;
    }

    function addPlayer(address wallet) public  {
        require(msg.sender == manager.getWallet(), "Only the manager can add players to the group.");
        (bool playerExists, Player aPlayer) = game.getPlayerByWallet(wallet);        
        require(playerExists, "Player does not exit.");
        
        players_wallet_map[wallet] = aPlayer;
        players_wallet_keys.push(wallet);
    }

    function getSummary() public view returns (string memory, Player, address[] memory, uint256, address) {
        return (
            name,
            manager,
            players_wallet_keys,
            address(this).balance,
            address(this)
        );
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getManager() public view returns (Player) {
        return manager;
    }
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0.");

        // TODO: We should have a list of people that deposit money.
    }

    function createMeeting(string memory latitude, string memory longitude) public {
        
        (bool playerExists, Player aPlayer) = getPlayerByWallet(msg.sender);
        require(playerExists, "No player exists for that wallet in this Group.");
        
        GeoLocation memory geoLocation = GeoLocation(latitude, longitude);
        Meeting memory aMeeting = Meeting(meetings.length, msg.sender, block.timestamp, new address[](10), geoLocation);
        meetings.push(aMeeting);
    }

    function addPlayerToMeeting(uint256 meetingId, address wallet) public {
        meetings[meetingId].membersPresent.push(wallet);
    }


    function getPlayerByWallet(address wallet) public view returns (bool, Player) {
        Player aPlayer = players_wallet_map[wallet];

        if (address(aPlayer) != address(0)) {
            return (true, aPlayer);
        } else {
            return (false, Player(address(0)));
        }
    }

    function getPlayerNames() public view returns (string[] memory) {
        string[] memory namesStrings = new string[](players_wallet_keys.length);

        for(uint256 i = 0; i < players_wallet_keys.length; i++) {
            namesStrings[i] = players_wallet_map[players_wallet_keys[i]].getName();
        }

        return namesStrings;   
    }

}