const express = require('express');
const router = express.Router();
const BlockchainService = require('../utils/blockchain');

const blockchainService = new BlockchainService();

// POST /match/start
router.post('/start', async (req, res) => {
  try {
    const { matchId, p1, p2, stake, autoStake } = req.body;
    
    // Validate required parameters
    if (!matchId || !p1 || !p2 || !stake) {
      return res.status(400).json({
        status: 'error',
        message: 'matchId, p1, p2, and stake are required'
      });
    }
    
    // Validate addresses
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!addressRegex.test(p1) || !addressRegex.test(p2)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid player address format'
      });
    }
    
    // Validate stake is a positive number
    const stakeAmount = parseFloat(stake);
    if (isNaN(stakeAmount) || stakeAmount <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Stake must be a positive number'
      });
    }
    
    console.log(`[API] Creating match: ${matchId} with players ${p1}, ${p2} and stake ${stake}`);
    
    // Create match
    const result = await blockchainService.createMatch(matchId, p1, p2, stakeAmount);
    
    // Optionally stake for the caller if autoStake is true
    if (autoStake === true) {
      try {
        console.log(`[API] Auto-staking for match ${matchId}`);
        const stakeResult = await blockchainService.stakeMatch(matchId);
        result.details.autoStake = stakeResult;
      } catch (stakeError) {
        console.error('[API] Auto-stake failed:', stakeError.message);
        result.details.autoStakeError = stakeError.message;
      }
    }
    
    res.json(result);
    
  } catch (error) {
    console.error('[API] Match start endpoint error:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Match creation failed',
      error: error.message
    });
  }
});

// POST /match/result
router.post('/result', async (req, res) => {
  try {
    const { matchId, winner } = req.body;
    
    // Validate required parameters
    if (!matchId || !winner) {
      return res.status(400).json({
        status: 'error',
        message: 'matchId and winner are required'
      });
    }
    
    // Validate winner address
    if (!/^0x[a-fA-F0-9]{40}$/.test(winner)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid winner address format'
      });
    }
    
    console.log(`[API] Committing result for match ${matchId} with winner ${winner}`);
    
    // Commit result
    const result = await blockchainService.commitResult(matchId, winner);
    
    res.json(result);
    
  } catch (error) {
    console.error('[API] Match result endpoint error:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Result commit failed',
      error: error.message
    });
  }
});

// POST /match/stake
router.post('/stake', async (req, res) => {
  try {
    const { matchId } = req.body;
    
    // Validate required parameters
    if (!matchId) {
      return res.status(400).json({
        status: 'error',
        message: 'matchId is required'
      });
    }
    
    console.log(`[API] Staking for match ${matchId}`);
    
    // Stake for the match
    const result = await blockchainService.stakeMatch(matchId);
    
    res.json(result);
    
  } catch (error) {
    console.error('[API] Match stake endpoint error:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Stake failed',
      error: error.message
    });
  }
});

module.exports = router;
