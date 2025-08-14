import React, { useState } from 'react';
import { purchaseTokens } from '../services/api';

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
      const result = await purchaseTokens(parseFloat(amount), address);
      
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

  const handleDemoPurchase = async () => {
    if (!address) {
      setStatus({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'info', message: 'Getting demo GT tokens...' });

    try {
      // Use a small amount for demo (0.1 USDT = 1 GT)
      const result = await purchaseTokens(0.1, address);
      
      setStatus({ 
        type: 'success', 
        message: `Demo GT tokens received! TX: ${result.txHash.slice(0, 10)}...` 
      });
      
      if (onPurchaseComplete) {
        onPurchaseComplete(result);
      }
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
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button 
          className="btn btn-success" 
          onClick={handlePurchase}
          disabled={loading || !address || !amount}
          style={{ flex: 1 }}
        >
          {loading ? (
            <>
              <span className="loading"></span> Purchasing...
            </>
          ) : (
            'Buy GT Tokens'
          )}
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={handleDemoPurchase}
          disabled={loading || !address}
          style={{ flex: 1 }}
        >
          {loading ? (
            <>
              <span className="loading"></span> Getting Demo...
            </>
          ) : (
            '🎮 Get Demo GT (0.1 USDT)'
          )}
        </button>
      </div>
      
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
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '10px', 
        borderRadius: '5px', 
        marginTop: '10px',
        fontSize: '14px',
        color: '#666'
      }}>
        <strong>💡 Demo Mode:</strong> Use "Get Demo GT" to quickly get 1 GT token for testing. This uses 0.1 USDT from your wallet.
      </div>
    </div>
  );
};

export default TokenPurchase;
