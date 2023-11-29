// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Player.sol";
import "./Group.sol";

contract Game {

    mapping(address => Player) public players_wallet_map;  address[] public players_wallet_keys;
    mapping(address => Group) public groups_map;  address[] public groups_map_keys;
    
    // -> GROUPS 

    function createGroup(string memory name) public {
        (bool playerExists, Player aPlayer) = getPlayerByWallet(msg.sender);
        require(playerExists, "No player exists for that wallet in this Game.");

        Group aGroup = new Group(aPlayer, name, this);
        groups_map[address(aGroup)] = aGroup;
        groups_map_keys.push(address(aGroup));
    }

    function getGroup(address anAddress) public view returns (bool, Group) {
        Group aGroup = groups_map[anAddress];

        if (address(aGroup) != address(0)) {
            return (true, aGroup);
        } else {
            return (false, Group(address(0)));
        }
    }

    function listGroups() public view returns (Group[] memory) {
        Group[] memory groups = new Group[](groups_map_keys.length);

        for(uint256 i = 0; i < groups_map_keys.length; i++) {
            groups[i] = groups_map[groups_map_keys[i]];
        }

        return groups;   
    }

    function listGroupNames() public view returns (string[] memory) {
        string[] memory namesStrings = new string[](groups_map_keys.length);

        for(uint256 i = 0; i < groups_map_keys.length; i++) {
            namesStrings[i] = groups_map[groups_map_keys[i]].getName();
        }

        return namesStrings;   
    }

    function listGroupSummaries() external view returns (string[] memory, Player[] memory, uint256[] memory, address[] memory) {
        string[] memory names = new string[](groups_map_keys.length);
        Player[] memory managers = new Player[](groups_map_keys.length);
        uint256[] memory balances = new uint256[](groups_map_keys.length);
        address[] memory addresses = new address[](groups_map_keys.length);

        for (uint256 i = 0; i < groups_map_keys.length; i++) {
            (string memory name, Player manager, address[] memory playerWallets, uint256 balance, address anAddress) = groups_map[groups_map_keys[i]].getSummary();
            names[i] = name;
            managers[i] = manager;
            balances[i] = balance;
            addresses[i] = anAddress;
        }

        return (names, managers, balances, addresses);
    }


    // -> PLAYERS

    function createPlayer(string memory name) public returns (Player) {
        (bool playerExists, Player aPlayer) = getPlayerByWallet(msg.sender);        
        require(!playerExists, "Player already exits.");

        Player newPlayer = new Player(msg.sender, name, this);
        players_wallet_map[msg.sender] = newPlayer;
        players_wallet_keys.push(msg.sender);
        return newPlayer;
    }
    
    function getPlayerByWallet(address wallet) public view returns (bool, Player) {
        Player aPlayer = players_wallet_map[wallet];

        if (address(aPlayer) != address(0)) {
            return (true, aPlayer);
        } else {
            return (false, Player(address(0)));
        }
    }

    function listPlayers() public view returns (Player[] memory) {
        Player[] memory players = new Player[](players_wallet_keys.length);

        for(uint256 i = 0; i < players_wallet_keys.length; i++) {
            players[i] = players_wallet_map[players_wallet_keys[i]];
        }

        return players;   
    }

    function listPlayerNames() public view returns (string[] memory) {
        string[] memory namesStrings = new string[](players_wallet_keys.length);

        for(uint256 i = 0; i < players_wallet_keys.length; i++) {
            namesStrings[i] = players_wallet_map[players_wallet_keys[i]].getName();
        }

        return namesStrings;   
    }

    function listPlayerSummaries() external view returns (address[] memory, string[] memory, address[] memory, uint256[] memory) {
        address[] memory addresses = new address[](players_wallet_keys.length);
        string[] memory names = new string[](players_wallet_keys.length);
        address[] memory wallets = new address[](players_wallet_keys.length);
        uint256[] memory balances = new uint256[](players_wallet_keys.length);

        for (uint256 i = 0; i < players_wallet_keys.length; i++) {
            (address theAddress, string memory name, address wallet, uint256 balance) = players_wallet_map[players_wallet_keys[i]].getSummary();
            addresses[i] = theAddress;
            names[i] = name;
            wallets[i] = wallet;
            balances[i] = balance;
        }

        return (addresses, names, wallets, balances);
    }

}

