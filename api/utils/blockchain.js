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
    // Hardcoded values for quick testing
    const config = {
      RPC_URL: 'http://127.0.0.1:8545',
      PRIVATE_KEY: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      USDT_ADDRESS: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      GAMETOKEN_ADDRESS: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      TOKENSTORE_ADDRESS: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
      PLAYGAME_ADDRESS: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
    };

    // Set environment variables if not already set
    Object.keys(config).forEach(key => {
      if (!process.env[key]) {
        process.env[key] = config[key];
      }
    });

    console.log('[BLOCKCHAIN] Configuration loaded successfully');
    return true;
  }

  async purchaseTokens(amount, buyerAddress) {
    if (!this.isConfigured) {
      throw new Error('Blockchain service not configured. Please set up your .env file with proper values.');
    }

    try {
      console.log(`[BLOCKCHAIN] Purchasing ${amount} USDT worth of game tokens for ${buyerAddress}`);
      
      // Get conversion rate
      const gtPerUsdt = await this.tokenStoreContract.gtPerUsdt();
      const gameTokensToMint = BigInt(amount) * gtPerUsdt;
      
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
      throw new Error('Blockchain service not configured. Please set up your .env file with proper values.');
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
      throw new Error('Blockchain service not configured. Please set up your .env file with proper values.');
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
      throw new Error('Blockchain service not configured. Please set up your .env file with proper values.');
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
