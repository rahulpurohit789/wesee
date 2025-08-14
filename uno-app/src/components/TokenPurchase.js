import React, { useState } from 'react';
import { blockchainAPI } from '../services/api';

const TokenPurchase = ({ address, onPurchaseComplete }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handlePurchase = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setStatus({ type: 'error', message: 'Please enter a valid amount' });
      return;
    }

    if (!address) {
      setStatus({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'info', message: 'Processing purchase...' });

    try {
      const result = await blockchainAPI.purchaseTokens(parseFloat(amount), address);
      
      setStatus({ 
        type: 'success', 
        message: `Purchase successful! TX: ${result.txHash.slice(0, 10)}...` 
      });
      
      if (onPurchaseComplete) {
        onPurchaseComplete(result);
      }
      
      setAmount('');
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>💰 Buy Game Tokens (GT)</h3>
      <p>Purchase GT tokens with USDT to participate in matches</p>
      
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="amount">USDT Amount:</label>
        <input
          id="amount"
          type="number"
          className="input"
          placeholder="Enter USDT amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.1"
          step="0.1"
          disabled={loading || !address}
        />
      </div>
      
      <button 
        className="btn btn-success" 
        onClick={handlePurchase}
        disabled={loading || !address || !amount}
      >
        {loading ? (
          <>
            <span className="loading"></span> Purchasing...
          </>
        ) : (
          'Buy GT Tokens'
        )}
      </button>
      
      {status && (
        <div className={`status ${status.type}`}>
          {status.message}
        </div>
      )}
      
      {!address && (
        <div className="status warning">
          ⚠️ Connect your wallet to purchase tokens
        </div>
      )}
    </div>
  );
};

export default TokenPurchase;
