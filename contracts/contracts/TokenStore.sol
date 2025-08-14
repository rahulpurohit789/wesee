// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./GameToken.sol";

contract TokenStore is Ownable {
    IERC20 public usdt;
    GameToken public gameToken;
    uint256 public gtPerUsdt = 10; // 1 USDT = 10 GT tokens

    event TokensPurchased(address buyer, uint256 usdtAmount, uint256 gtAmount);

    constructor(address _usdt, address _gameToken) Ownable(msg.sender) {
        usdt = IERC20(_usdt);
        gameToken = GameToken(_gameToken);
    }

    function buy(uint256 usdtAmount) external {
        require(usdtAmount > 0, "Amount must be greater than 0");
        
        uint256 gtAmount = usdtAmount * gtPerUsdt;
        
        // Transfer USDT from buyer to this contract
        require(usdt.transferFrom(msg.sender, address(this), usdtAmount), "USDT transfer failed");
        
        // Mint GT tokens to buyer
        gameToken.mint(msg.sender, gtAmount);
        
        emit TokensPurchased(msg.sender, usdtAmount, gtAmount);
    }

    function setGtPerUsdt(uint256 _gtPerUsdt) external onlyOwner {
        gtPerUsdt = _gtPerUsdt;
    }

    function withdrawUSDT() external onlyOwner {
        uint256 balance = usdt.balanceOf(address(this));
        require(balance > 0, "No USDT to withdraw");
        usdt.transfer(owner(), balance);
    }
}
