import React, { useState } from 'react';

const StakingInterface = ({ matchId, stakeAmount, onStake, isStaked = false, disabled = false }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleStake = async () => {
    if (!matchId) {
      setStatus({ type: 'error', message: 'No match ID provided' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'info', message: 'Processing stake...' });

    try {
      await onStake(matchId);
      setStatus({ type: 'success', message: 'Stake successful! You can now play.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ 
      background: isStaked ? 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)' : 'white',
      border: isStaked ? '2px solid #28a745' : '1px solid #e0e0e0'
    }}>
      <h3>💰 Staking Interface</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Match ID:</strong> {matchId ? `${matchId.slice(0, 10)}...` : 'Not set'}</p>
        <p><strong>Required Stake:</strong> {stakeAmount} GT</p>
        <p><strong>Status:</strong> 
          {isStaked ? (
            <span style={{ color: '#28a745', fontWeight: 'bold' }}>✅ Staked</span>
          ) : (
            <span style={{ color: '#dc3545', fontWeight: 'bold' }}>❌ Not Staked</span>
          )}
        </p>
      </div>

      {!isStaked && (
        <button 
          className="btn btn-success" 
          onClick={handleStake}
          disabled={loading || disabled || !matchId}
          style={{ width: '100%' }}
        >
          {loading ? (
            <>
              <span className="loading"></span> Staking...
            </>
          ) : (
            `💰 Stake ${stakeAmount} GT`
          )}
        </button>
      )}

      {isStaked && (
        <div className="status success">
          ✅ You have successfully staked {stakeAmount} GT for this match!
        </div>
      )}

      {status && (
        <div className={`status ${status.type}`}>
          {status.message}
        </div>
      )}

      <div style={{ 
        marginTop: '15px',
        padding: '10px',
        background: '#f8f9fa',
        borderRadius: '5px',
        fontSize: '14px'
      }}>
        <strong>💡 How Staking Works:</strong>
        <ul style={{ marginTop: '5px', textAlign: 'left' }}>
          <li>Both players must stake {stakeAmount} GT to start the game</li>
          <li>The winner receives both stakes (2× {stakeAmount} GT)</li>
          <li>Stakes are locked until the game ends</li>
        </ul>
      </div>
    </div>
  );
};

export default StakingInterface;
