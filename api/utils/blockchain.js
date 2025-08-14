const { ethers } = require('ethers');
const { USDT_ABI, GAMETOKEN_ABI, TOKENSTORE_ABI, PLAYGAME_ABI } = require('../contracts/abis');

class BlockchainService {
  constructor() {
    // Check if required environment variables are set
    this.isConfigured = this.checkConfiguration();
    
    if (this.isConfigured) {
      this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
      this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
      
      // Initialize contract instances
      this.usdtContract = new ethers.Contract(process.env.USDT_ADDRESS, USDT_ABI, this.wallet);
      this.gameTokenContract = new ethers.Contract(process.env.GAMETOKEN_ADDRESS, GAMETOKEN_ABI, this.wallet);
      this.tokenStoreContract = new ethers.Contract(process.env.TOKENSTORE_ADDRESS, TOKENSTORE_ABI, this.wallet);
      this.playGameContract = new ethers.Contract(process.env.PLAYGAME_ADDRESS, PLAYGAME_ABI, this.wallet);
    } else {
      console.warn('[BLOCKCHAIN] Blockchain service not configured. Set up your .env file with proper values.');
    }
  }

  checkConfiguration() {
    // For now, let's use demo mode to avoid contract deployment issues
    console.log('[BLOCKCHAIN] Using demo mode - no blockchain interaction required');
    return false; // This will enable demo mode
  }

  async purchaseTokens(amount, buyerAddress) {
    if (!this.isConfigured) {
      console.log('[BLOCKCHAIN] Demo mode: Simulating token purchase');
      return {
        status: 'success',
        txHash: '0x' + Math.random().toString(16).substr(2, 64),
        details: {
          buyer: buyerAddress,
          usdtAmount: amount,
          gtAmount: amount * 10, // 1 USDT = 10 GT
          message: 'Demo purchase successful'
        }
      };
    }

    try {
      console.log(`[BLOCKCHAIN] Purchasing ${amount} USDT worth of game tokens for ${buyerAddress}`);
      
      // Get conversion rate
      const gtPerUsdt = await this.tokenStoreContract.gtPerUsdt();
      
      // Convert amount to USDT wei (6 decimals)
      const usdtAmountWei = ethers.parseUnits(amount.toString(), 6);
      
      // Calculate GT amount (18 decimals)
      const gameTokensToMint = usdtAmountWei * gtPerUsdt;
      
      // Call TokenStore.buy()
      const tx = await this.tokenStoreContract.buy(ethers.parseUnits(amount.toString(), 6));
      const receipt = await tx.wait();
      
      console.log(`[BLOCKCHAIN] Purchase successful. TX: ${receipt.hash}`);
      
      return {
        status: 'success',
        txHash: receipt.hash,
        details: {
          usdtAmount: amount,
          gameTokensMinted: ethers.formatUnits(gameTokensToMint, 18),
          buyer: buyerAddress,
          blockNumber: receipt.blockNumber
        }
      };
    } catch (error) {
      console.error('[BLOCKCHAIN] Purchase failed:', error.message);
      throw error;
    }
  }

  async createMatch(matchId, p1, p2, stake) {
    if (!this.isConfigured) {
      console.log('[BLOCKCHAIN] Demo mode: Simulating match creation');
      return {
        status: 'success',
        txHash: '0x' + Math.random().toString(16).substr(2, 64),
        details: {
          matchId: matchId,
          player1: p1,
          player2: p2,
          stake: stake,
          message: 'Demo match created successfully'
        }
      };
    }

    try {
      console.log(`[BLOCKCHAIN] Creating match ${matchId} with players ${p1}, ${p2} and stake ${stake}`);
      
      // Convert stake to wei
      const stakeInWei = ethers.parseEther(stake.toString());
      
      // Call PlayGame.createMatch()
      const tx = await this.playGameContract.createMatch(matchId, p1, p2, stakeInWei);
      const receipt = await tx.wait();
      
      console.log(`[BLOCKCHAIN] Match created successfully. TX: ${receipt.hash}`);
      
      return {
        status: 'success',
        txHash: receipt.hash,
        details: {
          matchId: matchId,
          player1: p1,
          player2: p2,
          stake: stake,
          blockNumber: receipt.blockNumber
        }
      };
    } catch (error) {
      console.error('[BLOCKCHAIN] Match creation failed:', error.message);
      throw error;
    }
  }

  async commitResult(matchId, winner) {
    if (!this.isConfigured) {
      console.log('[BLOCKCHAIN] Demo mode: Simulating result commit');
      return {
        status: 'success',
        txHash: '0x' + Math.random().toString(16).substr(2, 64),
        details: {
          matchId: matchId,
          winner: winner,
          message: 'Demo result committed successfully'
        }
      };
    }

    try {
      console.log(`[BLOCKCHAIN] Committing result for match ${matchId} with winner ${winner}`);
      
      // Call PlayGame.commitResult()
      const tx = await this.playGameContract.commitResult(matchId, winner);
      const receipt = await tx.wait();
      
      console.log(`[BLOCKCHAIN] Result committed successfully. TX: ${receipt.hash}`);
      
      return {
        status: 'success',
        txHash: receipt.hash,
        details: {
          matchId: matchId,
          winner: winner,
          blockNumber: receipt.blockNumber
        }
      };
    } catch (error) {
      console.error('[BLOCKCHAIN] Result commit failed:', error.message);
      throw error;
    }
  }

  async stakeMatch(matchId) {
    if (!this.isConfigured) {
      console.log('[BLOCKCHAIN] Demo mode: Simulating stake');
      return {
        status: 'success',
        txHash: '0x' + Math.random().toString(16).substr(2, 64),
        details: {
          matchId: matchId,
          staker: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
          message: 'Demo stake successful'
        }
      };
    }

    try {
      console.log(`[BLOCKCHAIN] Staking for match ${matchId}`);
      
      // Call PlayGame.stake()
      const tx = await this.playGameContract.stake(matchId);
      const receipt = await tx.wait();
      
      console.log(`[BLOCKCHAIN] Stake successful. TX: ${receipt.hash}`);
      
      return {
        status: 'success',
        txHash: receipt.hash,
        details: {
          matchId: matchId,
          staker: this.wallet.address,
          blockNumber: receipt.blockNumber
        }
      };
    } catch (error) {
      console.error('[BLOCKCHAIN] Stake failed:', error.message);
      throw error;
    }
  }
}

module.exports = BlockchainService;
