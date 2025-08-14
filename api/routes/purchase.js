const express = require('express');
const router = express.Router();
const BlockchainService = require('../utils/blockchain');

const blockchainService = new BlockchainService();

// GET /purchase?amount=USDT
router.get('/purchase', async (req, res) => {
  try {
    const { amount, buyer } = req.query;
    
    // Validate required parameters
    if (!amount) {
      return res.status(400).json({
        status: 'error',
        message: 'Amount parameter is required'
      });
    }
    
    if (!buyer) {
      return res.status(400).json({
        status: 'error',
        message: 'Buyer address parameter is required'
      });
    }
    
    // Validate amount is a positive number
    const usdtAmount = parseFloat(amount);
    if (isNaN(usdtAmount) || usdtAmount <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Amount must be a positive number'
      });
    }
    
    // Validate buyer address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(buyer)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid buyer address format'
      });
    }
    
    console.log(`[API] Purchase request: ${usdtAmount} USDT for ${buyer}`);
    
    // Call blockchain service
    const result = await blockchainService.purchaseTokens(usdtAmount, buyer);
    
    res.json(result);
    
  } catch (error) {
    console.error('[API] Purchase endpoint error:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Purchase failed',
      error: error.message
    });
  }
});

module.exports = router;
