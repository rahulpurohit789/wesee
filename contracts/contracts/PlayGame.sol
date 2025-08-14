// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./GameToken.sol";

contract PlayGame is Ownable {
    IERC20 public gameToken;
    
    struct Match {
        address player1;
        address player2;
        uint256 stakeAmount;
        bool isActive;
        address winner;
        bool isCompleted;
    }
    
    mapping(bytes32 => Match) public matches;
    mapping(bytes32 => mapping(address => bool)) public hasStaked;
    
    event MatchCreated(bytes32 indexed matchId, address player1, address player2, uint256 stakeAmount);
    event Staked(bytes32 indexed matchId, address player);
    event MatchResult(bytes32 indexed matchId, address winner, uint256 reward);

    constructor(address _gameToken) Ownable(msg.sender) {
        gameToken = IERC20(_gameToken);
    }

    function createMatch(bytes32 matchId, address p1, address p2, uint256 stakeAmount) external {
        require(matches[matchId].player1 == address(0), "Match already exists");
        require(p1 != p2, "Players must be different");
        require(stakeAmount > 0, "Stake must be greater than 0");
        
        matches[matchId] = Match({
            player1: p1,
            player2: p2,
            stakeAmount: stakeAmount,
            isActive: true,
            winner: address(0),
            isCompleted: false
        });
        
        emit MatchCreated(matchId, p1, p2, stakeAmount);
    }

    function stakeMatch(bytes32 matchId) external {
        Match storage matchData = matches[matchId];
        require(matchData.isActive, "Match not active");
        require(msg.sender == matchData.player1 || msg.sender == matchData.player2, "Not a player");
        require(!hasStaked[matchId][msg.sender], "Already staked");
        
        // Transfer GT tokens from player to contract
        require(gameToken.transferFrom(msg.sender, address(this), matchData.stakeAmount), "Token transfer failed");
        
        hasStaked[matchId][msg.sender] = true;
        emit Staked(matchId, msg.sender);
    }

    function commitResult(bytes32 matchId, address winner) external onlyOwner {
        Match storage matchData = matches[matchId];
        require(matchData.isActive, "Match not active");
        require(winner == matchData.player1 || winner == matchData.player2, "Invalid winner");
        require(hasStaked[matchId][matchData.player1] && hasStaked[matchId][matchData.player2], "Both players must stake");
        
        matchData.winner = winner;
        matchData.isCompleted = true;
        matchData.isActive = false;
        
        // Transfer total stake to winner
        uint256 totalReward = matchData.stakeAmount * 2;
        require(gameToken.transfer(winner, totalReward), "Reward transfer failed");
        
        emit MatchResult(matchId, winner, totalReward);
    }

    function getMatch(bytes32 matchId) external view returns (Match memory) {
        return matches[matchId];
    }

    function hasPlayerStaked(bytes32 matchId, address player) external view returns (bool) {
        return hasStaked[matchId][player];
    }
}
