// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenAirdrop is Ownable {
    IERC20 public token;

    event Airdrop(address indexed to, uint256 amount);

    constructor(address _tokenAddress, address initialOwner) Ownable(initialOwner) {
        require(_tokenAddress != address(0), "Invalid token address");
        token = IERC20(_tokenAddress);
    }


    function setToken(address _tokenAddress) external onlyOwner {
        require(_tokenAddress != address(0), "Invalid token address");
        token = IERC20(_tokenAddress);
    }

    function airdrop(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {
        require(recipients.length == amounts.length, "Mismatched array lengths");

        for (uint256 i = 0; i < recipients.length; i++) {
            address to = recipients[i];
            uint256 amount = amounts[i];

            require(to != address(0), "Invalid recipient address");
            require(amount > 0, "Invalid amount");

            bool success = token.transfer(to, amount);
            require(success, "Token transfer failed");

            emit Airdrop(to, amount);
        }
    }

    function modifyAirdropAmount(address recipient, uint256 newAmount) external onlyOwner {
        require(recipient != address(0), "Invalid recipient address");
        require(newAmount > 0, "Invalid new amount");

        bool success = token.transfer(recipient, newAmount);
        require(success, "Token transfer failed");

        emit Airdrop(recipient, newAmount);
    }
}
