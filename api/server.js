const express = require('express');
const cors = require('cors');
require('dotenv').config();

const purchaseRoutes = require('./routes/purchase');
const matchRoutes = require('./routes/match');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/', purchaseRoutes);
app.use('/match', matchRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Smart Contract API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  const BlockchainService = require('./utils/blockchain');
  const blockchainService = new BlockchainService();
  
  res.json({
    status: 'success',
    message: 'Smart Contract Development API',
    version: '1.0.0',
    configured: blockchainService.isConfigured,
    endpoints: {
      'GET /purchase': 'Purchase game tokens with USDT',
      'POST /match/start': 'Create a new match',
      'POST /match/result': 'Commit match result',
      'GET /health': 'Health check'
    },
    note: blockchainService.isConfigured 
      ? 'API is ready to interact with blockchain contracts'
      : 'API is running but blockchain service is not configured. Set up your .env file to enable contract interactions.'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[SERVER] Unhandled error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`[SERVER] Smart Contract API running on port ${PORT}`);
  console.log(`[SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[SERVER] Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
