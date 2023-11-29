pragma solidity ^0.8.9;
// SPDX-License-Identifier: MIT
import '../../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract RisaToken is ERC20 {
     constructor() ERC20 ('Risa', 'RISA') {
         _mint(msg.sender, 10000 * 10 ** 18);
     }
 }